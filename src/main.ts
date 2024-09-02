import { createApp } from "vue";
import "./tailwind.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import { ICurrencyConverterServiceKey } from "./service/ICurrencyConverterService";
import { ApiCurrencyConverterService } from "./service/ApiCurrencyConverterService";

import { buildRouter } from "./routes/root";

const router = buildRouter();
const pinia = createPinia();

const app = createApp(App);

app.provide(ICurrencyConverterServiceKey, new ApiCurrencyConverterService());
app.use(router);
app.use(pinia);
app.mount("#app");
