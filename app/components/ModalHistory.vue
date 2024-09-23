<script setup>
import { useRouteQuery } from '@vueuse/router'
const modal = useRouteQuery('modal')
const opened = computed(() => modal.value === 'history')
const store = {
   chat: chatStore()
}
const { getHistory, history, removeConversation } = store.chat

const dialog = shallowRef()
const dialogBody = shallowRef()
watch(opened, (v) => {
   if (!v) {
      dialog.value?.close()
      modal.value = null
   } else {
      dialog.value?.showModal()
      getHistory()
   }
})

useEventListener(document, 'keyup', (e) => {
   if (e.key === 'Escape' && opened.value) {
      e.preventDefault()
      dialog.value?.close()
      modal.value = null
   }
})

onClickOutside(dialogBody, () => {
   if (opened.value) {
      dialog.value?.close()
      modal.value = null
   }
})


onMounted(() => {
   if (!opened.value) {
      dialog.value?.close()
      modal.value = null
   }
   else {
      dialog?.value?.showModal()
      getHistory()
   }
})
</script>

<template>
   <Teleport to="body">
      <dialog ref="dialog"
         class="size-full bg-transparent p-0 m-0 max-w-screen max-h-screen grid place-items-center outline-0 rounded-md backdrop:(bg-dark-9/50 backdrop-blur-sm)">
         <div ref="dialogBody" class="relative rounded-lg z-1 bg-black p-6 rounded-md">
            <div class="grid grid-cols-2 gap-6 max-h-90dvh max-w-90vw mx-auto overflow-y-auto">
               <template v-for="(conversation, i) in (history || [])" :key="conversation?.id || i">
                  <div
                     class="ring-2 ring-inset ring-transparent px-4 py-2 rounded-md bg-dark-4 hover:(bg-dark-2 ring-light) duration-300 ease-in-out">
                     <NuxtLink :to="`/chat/` + conversation.id" class="block outline-none">
                        <span class="text-light">
                           {{ conversation.first_question }}
                        </span>
                     </NuxtLink>

                     <div class="flex items-center justify-between">
                        <time class="text-xs text-gray-4">
                           {{ useDateFormat(conversation?.created_at, 'DD/MM/YYYY hh:mm:ss').value }}
                        </time>
                        <button @click.prevent="removeConversation(conversation.id)"
                           class="grid place-items-center text-light hover:(text-rose-5)" type="button">
                           <i class="size-5 i-fluent:delete-32-filled" />
                        </button>
                     </div>
                  </div>
               </template>

               <div class="col-span-2 text-center text-white">
                  Empty...
               </div>
            </div>
         </div>
      </dialog>
   </Teleport>
</template>