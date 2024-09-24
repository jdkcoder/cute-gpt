<script setup>
const isShown = shallowRef(false)

const onClick = (modal) => {
   navigateTo({ query: { modal } })
}
</script>

<template>
   <div class="fixed bottom-6 left-10" @mouseenter="isShown = true" @mouseleave="isShown = false">
      <div class="flex flex-col gap-4">
         <button @click="onClick('remove')"  v-if="$route.name !== 'index'"
            class="p-2 grid place-items-center rounded-full shadow-md  bg-black ring-1.5 ring-inset ring-rose-5 text-rose-5 hover:(bg-rose-5 text-light) focus:(bg-rose-5 text-light) duration-200 ease-in-out"
            type="button">
            <i class="size-6 i-fluent:delete-32-filled" />
         </button>
         <button @click="onClick('new')" v-if="$route.name !== 'index'"
            class="p-2 grid place-items-center rounded-full shadow-md  bg-black ring-1.5 ring-inset ring-emerald-5 text-emerald-5 hover:(bg-emerald-5 text-light) focus:(bg-emerald-5 text-light) duration-200 ease-in-out"
            type="button">
            <i class="size-6 i-fluent:add-32-filled" />
         </button>
         <button @click="onClick('history')" 
            class="p-2 grid place-items-center rounded-full shadow-md bg-black ring-1.5 ring-inset ring-orange-4 text-orange-4 hover:(bg-orange-4 text-light) focus:(bg-orange-4 text-light) duration-200 ease-in-out"
            type="button">
            <i class="size-6 i-fluent:history-32-regular" />
         </button>
         <!-- <button @click="useCookie('user').value = null" 
            class="p-2 grid place-items-center rounded-full shadow-md bg-black ring-1.5 ring-inset ring-violet-4 text-violet-4 hover:(bg-violet-4 text-light) focus:(bg-violet-4 text-light) duration-200 ease-in-out"
            type="button">
            <i class="size-6 i-fluent:sign-out-24-regular" />
         </button> -->
      </div>
   </div>
</template>