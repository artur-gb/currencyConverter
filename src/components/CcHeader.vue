<template>
  <div
    class="flex gap-2 justify-end items-center bg-slate-600 h-10 sticky top-0 px-2"
  >
    <cc-dropdown
      :value="store.selectedCurrency"
      :dropdown-option="DropdownOptions"
      @update:value="(value) => onCurrencyChange(value)"
      class="bg-slate-600 text-white"
    />
    <router-link
      :to="{
        name: NamedRoutes.MainPage,
      }"
    >
      <button class="flex items-center text-xl p-2 gap-2 text-white">
        <span>main</span>
        <chart-icon />
      </button>
    </router-link>
    <router-link
      :to="{
        name: NamedRoutes.ConvertPage,
      }"
    >
      <button class="flex items-center text-xl p-2 gap-2 text-white">
        <span>convert</span>
        <converter-icon />
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { NamedRoutes } from "../routes/root";

import chartIcon from "../assets/icons/chartIcon.vue";
import converterIcon from "../assets/icons/converterIcon.vue";

import CcDropdown from "./CcDropdown.vue";
import { useStore } from "../store/store";
import { Currency, CurrencyCode } from "../entities/Currency";
import { onMounted } from "vue";

const DropdownOptions: Currency[] = [
  {
    label: "EURO",
    code: CurrencyCode.Euro,
  },
  {
    label: "RUBLE",
    code: CurrencyCode.Ruble,
  },
  {
    label: "US DOLLAR",
    code: CurrencyCode.Dollar,
  },
];

const store = useStore();

const onCurrencyChange = (selectedCurrency: Currency | undefined) => {
  if (selectedCurrency) {
    store.selectCurrency(selectedCurrency);
    localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency));
  }
};

onMounted(() => {
  const storedData = localStorage.getItem("selectedCurrency");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    store.selectCurrency(parsedData);
  } else
    store.selectCurrency({
      label: "RUBLE",
      code: CurrencyCode.Ruble,
    });
});
</script>

<style scoped></style>
