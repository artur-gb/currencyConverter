<template>
  <div class="loader" />
</template>

<style scoped>
.loader {
  height: 4px;
  --c: no-repeat linear-gradient(#64748b 0 0);
  background: var(--c), var(--c), #cbd5e1;
  background-size: 60% 100%;
  animation: l16 3s infinite;
}
@keyframes l16 {
  0% {
    background-position: -150% 0, -150% 0;
  }
  66% {
    background-position: 250% 0, -150% 0;
  }
  100% {
    background-position: 250% 0, 250% 0;
  }
}
</style>
