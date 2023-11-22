import "element-plus/es/components/message/style/css";
import "element-plus/dist/index.css";
// import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// export default defineNuxtPlugin((nuxtApp) => {

// })

import ElementPlus from "element-plus";
import { ID_INJECTION_KEY } from "element-plus";
// import localeEs from 'element-plus/es/locale/lang/es'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 1000),
    current: 0,
  });

  nuxtApp.vueApp.use(ElementPlus);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component);
  }

  // const app = createApp(RootComponent)
  // app.config.globalProperties.$myGlobalVariable = globalVariable
});