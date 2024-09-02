<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col grow max-w-[800px] gap-4 p-4 items-center">
      <cc-loader v-if="store.isCurrencyLoading" class="w-full" />
      <div v-else v-for="currency in currencyList" class="flex text-2xl gap-3">
        <div class="flex gap-1 items-center">
          <span>1</span>
          <component :is="currency.icon" />
        </div>
        <span>=</span>
        <div class="flex gap-1 items-center">
          <span>{{ currency.value }}</span>
          <component :is="selectedCurrency.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, computed } from "vue";
import { useStore } from "../store/store";
import { CurrencyCode } from "../entities/Currency";
import CcLoader from "../components/CcLoader.vue";

import rubleIcon from "../assets/icons/rubleIcon.vue";
import euroIcon from "../assets/icons/euroIcon.vue";
import usdIcon from "../assets/icons/usdIcon.vue";

const store = useStore();

const currencyOptions = [
  {
    icon: euroIcon,
    code: CurrencyCode.Euro,
  },
  {
    icon: rubleIcon,
    code: CurrencyCode.Ruble,
  },
  {
    icon: usdIcon,
    code: CurrencyCode.Dollar,
  },
];

const currencyList = computed(() => {
  const res = currencyOptions.reduce((acc, option) => {
    if (store.selectedCurrency.code !== option.code)
      acc.push({
        icon: option.icon,
        code: option.code,
        value:
          Number(
            store.currentCurrencyValues?.[
              `${option.code}-${store.selectedCurrency.code}`
            ].toFixed(2)
          ) ?? 1,
      });
    return acc;
  }, [] as { icon: Component; code: string; value: number }[]);
  return res;
});

const selectedCurrency = computed(() => {
  return (
    currencyOptions.find(
      (option) => option.code === store.selectedCurrency.code
    ) ?? currencyOptions[0]
  );
});
</script>
