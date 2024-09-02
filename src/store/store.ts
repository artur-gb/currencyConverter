import { defineStore } from "pinia";
import { ref } from "vue";
import { Currency, CurrencyCode, CurrencyPairs } from "../entities/Currency";
import { useCurrencyConverterService } from "../service/useCurrencyConverterService";

export const useStore = defineStore("currencyStore", () => {
  const selectedCurrency = ref<Currency>({
    label: "Ruble",
    code: CurrencyCode.Ruble,
  });
  
  const selectCurrency = (currency: Currency) => {
    selectedCurrency.value = currency;
  };

  const currentCurrencyValues = ref<CurrencyPairs>();
  const isCurrencyLoading = ref(false);

  const ccService = useCurrencyConverterService();

  const fetchCurrencyValues = async () => {
    isCurrencyLoading.value = true;
    try {
      const res = await ccService.getCurrencies();
      if (res) currentCurrencyValues.value = res;
    } catch (error) {
      console.error(error);
    }

    isCurrencyLoading.value = false;
  };

  return {
    selectedCurrency,
    selectCurrency,
    currentCurrencyValues,
    isCurrencyLoading,
    fetchCurrencyValues,
  };
});
