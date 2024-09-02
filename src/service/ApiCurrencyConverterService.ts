import { ICurrencyConverterService } from "./ICurrencyConverterService";
import { CurrencyPairs } from "../entities/Currency";

export class ApiCurrencyConverterService implements ICurrencyConverterService {
  async getCurrencies(
  ): Promise<CurrencyPairs | null> {

    const response = await fetch(
      "https://status.neuralgeneration.com/api/currency",
      {
        method: "GET"
      }
    );

    if (response.status !== 200) {
      throw new Error(`List error: ${await response.text()}`);
    }

    const result = await response.json();
    return result as CurrencyPairs;
  }
}
