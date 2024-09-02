<template>
  <cc-header />
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import CcHeader from "./components/CcHeader.vue";

import { RouterView } from "vue-router";

import { useStore } from "./store/store";

const store = useStore();

onMounted(store.fetchCurrencyValues);
</script>

<style scoped></style>
