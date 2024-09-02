<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col grow md:max-w-[800px] gap-4 p-4">
      <cc-loader v-if="store.isCurrencyLoading" class="w-full" />
      <template v-else>
        <div class="flex gap-2 w-full">
          <cc-dropdown
            v-model:value="upperCurrency"
            :dropdown-option="DropdownOptions"
            class="h-12 grow bg-slate-300"
          />
          <input
            v-model="upperValue"
            type="number"
            name="quantity"
            min="0"
            class="rounded-sm p-2 bg-slate-300 w-1/3"
            @change="onUpperValueChange"
          />
        </div>
        <div class="flex gap-2 w-full">
          <cc-dropdown
            v-model:value="lowerCurrency"
            :dropdown-option="DropdownOptions"
            class="h-12 grow bg-slate-300"
          />
          <input
            v-model="lowerValue"
            type="number"
            name="quantity"
            min="0"
            class="rounded-sm p-2 bg-slate-300 w-1/3"
            @change="onLowerValueChange"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Currency, CurrencyCode } from "../entities/Currency";
import CcDropdown from "../components/CcDropdown.vue";
import CcLoader from "../components/CcLoader.vue";
import { useStore } from "../store/store";

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

const upperCurrency = ref<Currency>(DropdownOptions[0]);
const lowerCurrency = ref<Currency>(DropdownOptions[1]);

const upperValue = ref<number>(0);
const lowerValue = ref<number>(0);

const store = useStore();

const onUpperValueChange = () => {
  if (upperCurrency.value.code === lowerCurrency.value.code)
    lowerValue.value = upperValue.value;
  else {
    const coef =
      store.currentCurrencyValues?.[
        `${upperCurrency.value.code}-${lowerCurrency.value.code}`
      ];
    const res = coef ? coef * upperValue.value : upperValue.value;
    lowerValue.value = Number(res.toFixed(2));
  }
};

const onLowerValueChange = () => {
  if (upperCurrency.value.code === lowerCurrency.value.code)
    upperValue.value = lowerValue.value;
  else {
    const coef =
      store.currentCurrencyValues?.[
        `${lowerCurrency.value.code}-${upperCurrency.value.code}`
      ];
    const res = coef ? coef * lowerValue.value : lowerValue.value;
    upperValue.value = Number(res.toFixed(2));
  }
};

watch(upperCurrency, onLowerValueChange);
watch(lowerCurrency, onUpperValueChange);
</script>
