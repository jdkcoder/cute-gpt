<script setup>
const store = {
   chat: chatStore()
}

const { isSending } = store.chat
</script>

<template>
   <button class="!bg-light text-dark px-3 py-1 rounded" :type="$attrs.type ?? 'button'">
      <div class="flex items-center gap-2">
         <span> Send </span>
         <div class="grid place-items-center">
            <i v-show="!isSending" class="col-start-1 row-start-1 i-fluent:send-16-filled" />
            <i v-show="isSending" class="col-start-1 row-start-1 i-svg-spinners:ring-resize" />
         </div>
      </div>
   </button>
</template>