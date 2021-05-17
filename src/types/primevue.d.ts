import Vue from 'vue';

// Primevue uses PluginFunction which was renamed to PluginInstallFunction in a later version of vue
// this temporarily fixes the typing problem when building the application
// https://github.com/primefaces/primevue/issues/1128

declare module 'vue' {
  export type PluginFunction<T> = (app: Vue.App, ...options: any[]) => any;
}
