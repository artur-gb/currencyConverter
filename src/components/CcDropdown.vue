<template>
  <select
    id="options"
    v-model="value"
    @change="() => emits('update:value', value)"
    class="rounded-sm p-2"
  >
    <option disabled value="">Currency:</option>
    <option
      v-for="(item, index) in props.dropdownOption"
      :key="index"
      :value="item"
    >
      <span class="flex p-2">
        {{ item.label }}
      </span>
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Currency } from "../entities/Currency";
import { watch } from "vue";

const props = defineProps<{
  value: Currency;
  dropdownOption: Currency[];
}>();

const value = ref<Currency>(props.value);

const emits = defineEmits<{
  (e: "update:value", value: Currency | undefined): void;
}>();

watch(
  () => props.value,
  () => {
    value.value = props.value
  }
);
</script>
