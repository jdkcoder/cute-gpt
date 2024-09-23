import ky from 'ky'
import { ulid } from 'ulidx'

export const chatStore = createStore("chat", ({ state }) => {
   const controller = new AbortController();
   const { signal } = controller;

   const inputVal = state('', { shallow: true });
   const { set: setConversation } = useIDB('conversations', [])
   const { set: setReply } = useIDB('replies', [])
   const { set: setMessage } = useIDB('messages', [])
   const currentModel = state('gpt-4o', { shallow: true });
   const allConversations = state([]);
   const allReplies = state([])
   const allMessages = state([])
   const currentRole = state('user', { shallow: true });
   const isThinking = state(false, { shallow: true })
   const isSending = state(false, { shallow: true })

   const newChat = useDebounceFn(async () => {
      const content = [ ...inputVal.value ].join('')
      inputVal.value = ''
      isThinking.value = true
      isSending.value = true
      const conversation_id = ulid(), reply_id = ulid()
      navigateTo({ name: 'chat-id', params: { id: conversation_id } })

      allConversations.value.unshift({ id: conversation_id, first_question: content })
      allReplies.value.unshift({ id: reply_id, conversation_id, messages: [] })
      allMessages.value.unshift({
         role: currentRole.value,
         content,
         reply_id,
         conversation_id
      })
      await Promise.all([
         setConversation(allConversations.value),
         setReply(allReplies.value),
         setMessage(allMessages.value),
         sendMessageToAI(content, conversation_id)
      ])
   }, 1000)

   const continueChat = useDebounceFn(async () => {
      const content = [ ...inputVal.value ].join('')
      inputVal.value = ''
      isThinking.value = true
      isSending.value = true
      const route = useRoute()
      const conversation_id = route.params.id, reply_id = ulid()

      allReplies.value.unshift({
         id: reply_id,
         conversation_id,
         messages: []
      })

      allMessages.value.unshift({
         id: ulid(),
         role: currentRole.value,
         content,
         reply_id,
         conversation_id: conversation_id,
      })

      console.log(`replies`, allReplies.value)
      console.log(`messages`, allMessages.value)
      const history = allMessages.value.filter(({ conversation_id }) => conversation_id === route.params.id).map(({ content, role }) => ({ content, role }))

      await Promise.all([
         setReply(allReplies.value),
         setMessage(allMessages.value),
         sendMessageToAI(content, conversation_id, history)
      ])
   }, 1000)



   const stop = () => {
      controller.abort()
      isThinking.value = false
      isSending.value = false
   }



   const sendMessageToAI = async (prompt, conversation_id, history) => {
      const reply_id = ulid()
      const AI_REPLY = {
         id: reply_id,
         conversation_id,
         messages: []
      }


      const json = { prompt, history }
      const searchParams = { model: currentModel.value, }
      const { data } = await ky.post(`/api/ai`, {
         json,
         searchParams,
         timeout: 5 * 60 * 1000,
         signal
      }).json()


      const replies = allReplies.value
      replies.unshift(AI_REPLY)
      allReplies.value = replies

      
      const messages = allMessages.value
      messages.unshift({
         id: ulid(),
         reply_id,
         conversation_id,
         ...data
      })
      allMessages.value = messages
      console.log(`replies`, allReplies.value)
      console.log(`messages`, allMessages.value)


      await Promise.all([
         setReply(replies),
         setMessage(messages)
      ])
      isThinking.value = false
   };



   const removeConversation = async (id) => {
      try {
         allConversations.value = allConversations.value.filter(({ id: conversation_id }) => conversation_id !== id)
         await setConversation(allConversations.value)
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
      } catch (err) {
         console.log(err)
      }
   }

   return {
      inputVal,
      currentModel,
      history,
      newChat,
      continueChat,
      stop,
      isThinking,
      isSending,
      checkUser,
      removeConversation,
      allConversations,
      allReplies,
      allMessages,
   };
});