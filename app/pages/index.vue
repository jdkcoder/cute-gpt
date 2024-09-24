<script setup>
const store = {
  chat: chatStore()
}

const { checkUser } = store.chat
const user = shallowRef('')
const validUser = useCookie('user')
</script>

<template>
  <section class="size-full grid place-items-center">
    <!-- <template v-if="validUser"> -->
      <ChatInput class="w-[80rem] mx-auto" />
    <!-- </template> -->

    <!-- <template v-else>
      <form @submit.prevent="checkUser(user)" class="flex gap-2 w-96">
        <input v-model="user"
          class="hover:(ring-light-9) focus:(ring-light-9) ring-2 ring-inset ring-transparent text-light px-4 py-2 !outline-none bg-black rounded-md duration-300 ease-in-out"
          placeholder="Enter your name" />
        <SendButton type="submit" />
      </form>
    </template> -->
  </section>
</template>