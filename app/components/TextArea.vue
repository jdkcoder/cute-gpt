<script setup>
const { textarea } = useTextareaAutosize({ styleProp: 'minHeight' })
const store = {
   chat: chatStore()
}

const { inputVal } = store.chat

</script>

<template>
   <textarea ref="textarea" v-model="inputVal" rows="2" class="text-light h-full p-4 resize-none !outline-none bg-transparent w-full"
      placeholder="What's on your mind?"></textarea>
</template>

<style>
textarea {
   -ms-overflow-style: none;
   scrollbar-width: none;
}

textarea::-webkit-scrollbar {
   display: none;
}
</style>