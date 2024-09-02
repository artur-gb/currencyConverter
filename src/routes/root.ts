import { createRouter, createWebHistory } from "vue-router";

import CcMainPage from "../pages/CcMainPage.vue";
import CcConvertPage from "../pages/CcConvertPage.vue";

export enum NamedRoutes {
  MainPage = "MainPage",
  ConvertPage = "ConvertPage",
}

export const buildRouter = () => {

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: `/`,
        redirect: "/",
        children: [
          {
            path: "",
            name: NamedRoutes.MainPage,
            component: CcMainPage,
          },
          {
            path: "convert",
            name: NamedRoutes.ConvertPage,
            component: CcConvertPage,
          },
        ],
      },
    ],
  });

  return router;
};
