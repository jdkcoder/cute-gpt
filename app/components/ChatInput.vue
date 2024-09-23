<script setup>
const route = useRoute()
const store = {
   chat: chatStore()
}

const { newChat, continueChat, currentModel } = store.chat

const models = [
   'gpt-4o',
   'chatgpt-4o-latest',
   'gpt-4o-mini',
   // 'o1-preview',
   // 'o1-mini',
   'gpt-4-turbo',
   'gpt-3.5-turbo',

   //Image
   // 'dall-e-3',

   // 'tts-1', //The latest text to speech model, optimized for speed.
   // 'tts-1-hd', //The latest text to speech model, optimized for quality.

   'text-embedding-3-large', //Most capable embedding model for both english and non-english tasks
   'text-embedding-3-small', //Increased performance over 2nd generation ada embedding model
   'text-embedding-ada-002', //Most capable 2nd generation embedding model, replacing 16 first generation models

   'text-moderation-007', //Most capable moderation model across all categories
]

useEventListener(document, 'keydown', async (e) => {
   if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();  
      route.name === 'chat-id' ? continueChat() : newChat()
   }
})


</script>
<template>
   <div :class="{}"
      class="h-full max-h-90dvh bg-black ring-2 ring-inset ring-neutral-6 rounded-lg shadow-md shadow-transparent focus-within:(shadow-light-9/90    ring-light-9/90) duration-300 ease-in-out">
      <TextArea class="!max-h-80dvh" />
      <div class="pl-4 py-4 w-max flex items-center flex-row-reverse gap-3">
         <SendButton @click="route.name === 'chat-id' ? continueChat() : newChat()" />
         <input v-model="currentModel" list="model" name="browser" id="browser"
            class="bg-transparent px-4 py-2 !outline-none ring-2 ring-inset ring-gray-4 rounded-md" />

         <datalist id="model">
            <template v-for="m in models" :key="m">
               <option :value="m" />
            </template>
         </datalist>
      </div>
   </div>
</template>