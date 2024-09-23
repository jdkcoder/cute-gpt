<script setup>
const store = {
   chat: chatStore()
}

const { ribbons, send, inputVal } = store.chat

</script>
<template>
   <div :class="ribbons.length > 0 ? 'h-100dvh' : 'h-full'" class="p-6">
      <div
         class="h-full pr-4 flex relative bg-black ring-2 ring-inset ring-neutral-6 rounded-lg shadow-md shadow-transparent focus-within:(shadow-light-9/90    ring-light-9/90) duration-300 ease-in-out">
         <TextArea />
         <SendButton @click="send(inputVal)"  class="mb-4 self-end" />
      </div>
   </div>
</template>