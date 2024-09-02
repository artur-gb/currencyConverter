import { InjectionKey } from "vue";
import { CurrencyPairs } from "../entities/Currency";

export interface ICurrencyConverterService {
  getCurrencies(): Promise<CurrencyPairs | null>;
}

export const ICurrencyConverterServiceKey =
  Symbol() as InjectionKey<ICurrencyConverterService>;
