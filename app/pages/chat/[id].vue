<script setup>
const route = useRoute()
const { id } = route.params

const store = {
  chat: chatStore()
}
const isLoaded = shallowRef(false)
const { currentMode, showConversation } = store.chat

onMounted(async () => {
  try {
    currentMode !== 'init' && await showConversation(id)
    isLoaded.value = true
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <template v-if="isLoaded">
    <div class="flex">
      <Conversation class="flex-1" />
      <ChatInput class="w-[40rem] mx-auto" />
    </div>
  </template>
  <template v-else>
    <div class="grid place-items-center h-100dvh w-screen">
      <i class="text-light size-32 i-svg-spinners:ring-resize" />
    </div>
  </template>
</template>