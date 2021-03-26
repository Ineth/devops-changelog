<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Menu
        :searchParams="searchParams"
        @open-settings="settingsVisible = !settingsVisible"
        @search-workitems="getWorkItems($event)"
      />
    </div>
    <div class="p-col-8" v-if="settingsVisible">
      <Settings
        :settings="settings"
        @close-settings="settingsVisible = false"
        @save-settings="saveSettings($event)"
      />
    </div>

    <div class="p-col-12">
      <WorkItemTable :work-items="workItemList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Menu from './components/Menu.vue';
import Settings from './components/Settings.vue';
import WorkItemTable from './components/WorkItemTable.vue';
import Card from 'primevue/card';

import { Settings as SettingsModel } from './models/Settings';
import devopsApi from './api/devops.api';
import { SearchParams } from './models/SearchParams';
import {
  getSearchParams,
  getSettings,
  saveSearchParams,
  saveSettings,
} from './api/localstorage.api';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Settings,
    WorkItemTable,
    Card,
  },
  setup: () => {
    const settings: Ref<SettingsModel> = ref(getSettings());
    const searchParams: Ref<SearchParams> = ref(getSearchParams());

    const settingsVisible = ref(false);
    const workItemList = ref(undefined);

    return { settings, searchParams, workItemList, settingsVisible };
  },
  methods: {
    saveSettings(settings: SettingsModel) {
      this.settings = settings;
      if (settings.saveToLocalStorage) {
        saveSettings(settings);
      }
    },
    async getWorkItems(searchParams: SearchParams) {
      this.searchParams = searchParams;
      saveSearchParams(searchParams);
      this.workItemList = await devopsApi.getWorkItemsBetweenBuilds(
        this.settings.apiKey,
        this.searchParams.fromBuildId,
        this.searchParams.toBuildId
      );
    },
  },
  // mounted() {
  //   const apiKey = localStorage.getItem('apiKey');
  //   if (apiKey) {
  //     this.settings.apiKey = apiKey;
  //   }
  //   const searchParams = localStorage.getItem('searchParams');
  //   if (searchParams) {
  //     this.searchParams = JSON.parse(searchParams);
  //   }
  // },
});
</script>

<style>
html {
  font-size: 16px;
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 1rem;
}
</style>
