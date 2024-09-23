<script setup>
import { useRouteQuery } from '@vueuse/router'
const modal = useRouteQuery('modal')
const opened = computed(() => modal.value === 'new')

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
</script>

<template>
   <Teleport to="body">
      <dialog
         class="size-full bg-transparent p-0 m-0 max-w-screen max-h-screen grid place-items-center outline-0 rounded-md backdrop:(bg-dark-9/50 backdrop-blur-sm)"
         ref="dialog">
         <div ref="dialogBody" class="relative rounded-lg z-1">
            <ChatInput class="w-80vw"/>
         </div>
      </dialog>
   </Teleport>
</template>