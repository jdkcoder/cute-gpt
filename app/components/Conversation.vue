<script setup>
const props = defineProps({
   replies: {
      type: Array,
      required: true
   }
})
const store = {
   chat: chatStore()
}

const { isThinking, stop } = store.chat
</script>
<template>
   <div class="space-y-6 h-full max-h-100dvh overflow-y-auto overflow-x-hidden">
      <template v-if="isThinking">
         <div class="flex gap-4">
            <img src="https://robohash.org/assistant" draggable="false" class="shrink-0 size-10 rounded-full" />
            <div class="self-center space-y-4 w-full overflow-hidden">
               <span v-for="i in 5" class="block w-full animate-pulse rounded-full h-2 bg-gray-6" />
            </div>
         </div>
         <div class="flex justify-end">
            <button @click="stop" class="flex items-center gap-2 text-orange-5" type="button">
               <i class="size-6 i-fluent:record-stop-32-regular" />
               <span>Stop</span>
            </button>
         </div>
      </template>
      <template v-for="(r, i) in props.replies" :key="r.id || i">
         <Ribbon :ribbon="r" />
      </template>
   </div>
</template>