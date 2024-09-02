export type Currency = {
  label: string;
  code: CurrencyCode;
};

export type CurrencyPairs = Record<string, number>;

export enum CurrencyCode {
  Euro = "eur",
  Ruble = "rub",
  Dollar = "usd",
}

