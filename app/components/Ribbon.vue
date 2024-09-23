<script setup>
const props = defineProps({
   ribbon: {
      type: Object,
      required: true
   }
})

const store = {
   chat: chatStore()
}

const { currentMessage } = store.chat
</script>
<template>
   <div v-if="props.ribbon" :class="{
      'ring-neutral': props.ribbon.messages.some(({ role }) => role === 'assistant')
   }" class="shadow-md shadow-transparent ring-2 ring-inset p-4 rounded-lg duration-300 ease-in-out">

      <template v-if="props.ribbon?.messages?.length > 0">
         <template v-for="(msg, i) in (props.ribbon?.messages || [])" :key="msg?.id || i">
            <div class="flex gap-4">
               <img :src="`https://robohash.org/` + msg.role" draggable="false" class="shrink-0 size-10 rounded-full" />
               <MDC class="self-center space-y-4 leading-6.5 tracking-wide w-full overflow-hidden" :value="msg.content"
                  v-if="msg.content" />
            </div>
         </template>
      </template>
   </div>
</template>

<style lang="stylus">
ol, ul
   & > * + * 
      margin-top 1rem   

code, pre
   background #010101

code
   user-select all
   border-radius: .25rem
   padding: .25rem .5rem

pre
   border-radius: .5rem
   margin-top 1rem
   padding: 1rem 1.25rem
   box-shadow inset 0 0 0 2px gray
   overflow hidden

   code
      user-select unset
</style>