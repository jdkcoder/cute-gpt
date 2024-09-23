import ky from 'ky'
import { ulid } from 'ulidx'

export const chatStore = createStore("chat", ({ state }) => {
   const controller = new AbortController();
   const { signal } = controller;

   const inputVal = state('', { shallow: true });
   const ribbons = state([])
   const history = state(null, { shallow: true })
   const currentModel = state('gpt-4o', { shallow: true });
   const currentConversation = state('', { shallow: true });
   const currentReply = state('', { shallow: true });
   const currentRole = state('user', { shallow: true });
   const currentMode = state(null, { shallow: true });
   const isThinking = state(false, { shallow: true })
   const isSending = state(false, { shallow: true })

   const send = async (content) => {
      inputVal.value = ''
      isSending.value = true
      isThinking.value = true
      currentRole.value = 'user'
      if (ribbons.value.length > 0) {
         const conversation_id = currentConversation.value.id
         const reply_id = ulid()
         const nextMsg = {
            role: currentRole.value,
            content,
            reply_id,
            conversation_id,
         }
         ribbons.value.unshift({ messages: [ nextMsg ] })
         isSending.value = false
         await storeReply(conversation_id, reply_id)
         await sendMessageToAI(content)
         await storeMessage(nextMsg)
         currentMode.value = null
      }
      else {
         currentMode.value = 'init'
         //1st reply & 1st message belong to user
         const conversation_id = ulid()
         const _1stConversation = {
            id: conversation_id,
            first_question: content
         }
         navigateTo('/chat/' + conversation_id)
         history.value = [ _1stConversation ]
         const reply_id = ulid()
         const _1stMsg = {
            role: currentRole.value,
            content,
            reply_id,
            conversation_id: conversation_id,
         }
         ribbons.value[ 0 ] = { messages: [ _1stMsg ] }
         isSending.value = false
         await storeConversation(_1stConversation)
         await storeReply(conversation_id, reply_id)
         await sendMessageToAI(content)
         await storeMessage(_1stMsg)
         currentMode.value = null
      }
   };

   const stop = () => {
      controller.abort()
      isThinking.value = false
      isSending.value = false
   }



   const sendMessageToAI = async (prompt) => {
      const json = { prompt };
      const searchParams = {
         model: currentModel.value,
      }
      const { data } = await ky.post(`/api/ai`, {
         json,
         searchParams,
         timeout: 5 * 60 * 1000,
         signal
      }).json()
      currentRole.value = 'assistant';
      const reply = await storeReply();
      ribbons.value.unshift(reply)
      ribbons.value[ 0 ].messages[ 0 ] = data
      isThinking.value = false
   };


   const storeConversation = async (conversation) => {
      try {
         console.log(conversation)
         const json = { ...conversation, user: useCookie('user').value }
         const searchParams = { type: 'conversation', mode: currentMode.value };
         const { data } = await ky.post('/api/store', {
            json,
            searchParams,
         }).json();

         currentConversation.value = data;
         navigateTo('/chat/' + data.id);
         return currentConversation.value;
      } catch (err) {
         console.error("Error storing conversation:", err);
      }
   };

   const storeReply = async (conversation_id, id) => {
      try {
         const route = useRoute();
         const json = { id, conversation_id: conversation_id ?? route.params.id }
         const searchParams = { type: 'reply', mode: currentMode.value };
         const { data } = await ky.post('/api/store', {
            json,
            searchParams,
         }).json();

         currentReply.value = data;
         return currentReply.value;
      } catch (err) {
         console.error("Error storing reply:", err);
      }
   };

   const storeMessage = async (msg) => {
      try {
         const json = { model: currentModel.value, ...msg };
         const searchParams = { type: 'message', mode: currentMode.value };
         const { data } = await ky.post('/api/store', {
            json,
            searchParams,
         }).json();

         if (currentRole.value === 'assistant') {
            ribbons.value[ 0 ].messages.unshift(data);
         }
      } catch (err) {
         console.error("Error storing message:", err);
      }
   };

   const getHistory = async () => {
      if (history.value) return
      try {
         const user = useCookie('user').value
         if (!user && !history.value) return
         const { data } = await ky.get('/api/history', {
            headers: {
               user
            }
         }).json()
         history.value = data
      } catch (err) {
         console.log(err)
      }
   }

   const showConversation = async (id) => {
      try {
         const { data } = await ky.get(`/api/conversation`, {
            searchParams: { id }
         }).json()
         data && (ribbons.value = data.replies)
      } catch (err) {
         console.log(err)
      }
   }

   const removeConversation = async (id) => {
      try {
         history.value && (history.value = history.value.filter(({ id: conversation_id }) => conversation_id !== id))
         const { data } = await ky.delete(`/api/conversation`, {
            searchParams: { id }
         }).json()
         navigateTo('/')
      } catch (err) {
         console.log(err)
      }
   }

   const checkUser = async (user) => {
      try {
         const { data } = await ky.post('/api/check-user', {
            json: { user }
         }).json()
         useCookie('user').value = data.name
         getHistory()
      } catch (err) {
         console.log(err)
      }
   }

   return {
      inputVal,
      currentReply,
      history,
      send,
      stop,
      getHistory,
      ribbons,
      isThinking,
      isSending,
      checkUser,
      showConversation,
      removeConversation
   };
});