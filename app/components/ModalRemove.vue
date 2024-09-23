<script setup>
import { useRouteQuery } from '@vueuse/router'
const modal = useRouteQuery('modal')
const opened = computed(() => modal.value === 'remove')
const route = useRoute()
const store = {
   chat: chatStore()
}
const { removeConversation } = store.chat
const dialog = shallowRef()
const dialogBody = shallowRef()
watch(opened, (v) => {
   if (!v) {
      dialog.value?.close()
      modal.value = null
   } else dialog.value?.showModal()
})

useEventListener(document, 'keyup', (e) => {
   if (e.key === 'Escape' && opened.value) {
      e.preventDefault()
      dialog.value?.close()
      modal.value = null
   }
})

onClickOutside(dialogBody, () => {
   dialog.value?.close()
   modal.value = null
})

onMounted(async () => {
   if (!opened.value) {
      dialog.value?.close()
      modal.value = null
   } else dialog?.value?.showModal()
})

const close = () => {
   dialog.value?.close()
   modal.value = null
}

const onRemove = async () => {
   await removeConversation(route.params.id)
   navigateTo('/')
}
</script>

<template>
   <Teleport to="body">
      <dialog
         class="size-full bg-transparent p-0 m-0 max-w-screen max-h-screen grid place-items-center outline-0 rounded-md backdrop:(bg-dark-9/50 backdrop-blur-sm)"
         ref="dialog">
         <div ref="dialogBody" class="relative rounded-lg z-1">
            <div class="p-6 bg-black text-light rounded-md">
               <div class="flex flex-col gap-4">
                  <span>
                     Wanna remove this conversation?
                  </span>

                  <div class="grid grid-cols-2 gap-4">
                     <button @click="close"
                        class="!outline-none px-4 py-2 text-dark bg-light  rounded-md hover:(text-light bg-black) duration-300 ease-in-out"
                        type="button">
                        No
                     </button>
                     <button @click="onRemove"
                        class="!outline-none px-4 py-2 ring-2 ring-inset ring-rose-5 text-rose-5  rounded-md hover:(text-light bg-rose-5) duration-300 ease-in-out"
                        type="button">
                        Yes
                     </button>
                  </div>
               </div>
            </div>


         </div>
      </dialog>
   </Teleport>
</template>