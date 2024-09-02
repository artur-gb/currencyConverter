import { inject } from "vue";
import {
  ICurrencyConverterService,
  ICurrencyConverterServiceKey,
} from "./ICurrencyConverterService";

export const useCurrencyConverterService = () => {
  return inject(ICurrencyConverterServiceKey) as ICurrencyConverterService;
};
