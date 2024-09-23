<script setup>
const route = useRoute()
const { id } = route.params

const store = {
  chat: chatStore()
}

const isLoaded = shallowRef(false)
const { allConversations: conversations, allReplies: replies, allMessages: messages } = store.chat
const currentConversation = computed(() => {
  if (conversations.value && replies.value && messages.value) {
    const data = conversations.value.reduce((acc, conversation) => {
      // Create a list of replies for the current conversation
      const conversationReplies = replies.value.reduce((replyAcc, reply) => {
        if (reply.conversation_id === conversation.id) {
          // Find the messages that belong to this reply
          const replyMessages = messages.value.filter(({ reply_id }) => reply_id === reply.id);
          // Add the messages to the reply
          replyAcc.push({ ...reply, messages: replyMessages });
        }
        return replyAcc;
      }, []);

      // Add the replies to the conversation
      acc.push({ ...conversation, replies: conversationReplies });
      return acc;
    }, [])

    return data.find(({ id }) => id === id)
  } else null
})
onMounted(() => {
  try {

    isLoaded.value = true
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <template v-if="isLoaded">
    <div class="flex gap-6 p-6">
      <Conversation :replies="currentConversation?.replies" class="flex-1" />
      <ChatInput class="w-[40rem] mx-auto" />
    </div>
  </template>
  <template v-else>
    <div class="grid place-items-center h-100dvh w-screen">
      <i class="text-light size-32 i-svg-spinners:ring-resize" />
    </div>
  </template>
</template>