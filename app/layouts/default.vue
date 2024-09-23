<script setup>

</script>

<template>
  <main class="relative size-full min-h-100dvh w-screen">
    <slot />
  </main>

  <FAB />
  <ModalNew />
  <ModalHistory />
  <ModalRemove />
</template>