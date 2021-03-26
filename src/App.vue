<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Card>
        <template #title>
          Welcome
      </template>
      <template #content>
        This small tool allows you to see DevOps work items that are included between 2 given build ids. <br>
        <strong>Note:</strong> Provide your API key in the settings.
    </template>
      </Card>
    </div>
    <div class="p-col-12">
      <Menu
        :searchParams="searchParams"
        :loading="loading"
        @open-settings="settingsVisible = !settingsVisible"
        @search-workitems="getWorkItems($event)"
      />
      <Message v-if="errorMessage" severity="error" :closable="false">{{errorMessage}}</Message>
    </div>
    <div class="p-col-12" v-if="settingsVisible">
      <div class="p-d-flex p-jc-center">
        <Settings
        
        :settings="settings"
        @close-settings="settingsVisible = false"
        @save-settings="saveSettings($event)"
        />
      </div>
    </div>

    <div class="p-col-12">
      <WorkItemTable :work-items="workItemList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Menu from './components/Menu.vue';
import Message from 'primevue/message';
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
    Message
  },
  setup: () => {
    const settings: Ref<SettingsModel> = ref(getSettings());
    const searchParams: Ref<SearchParams> = ref(getSearchParams());

    const settingsVisible = ref(false);
    const workItemList = ref(undefined);
    const errorMessage = ref('');
    const loading = ref(false);

    return { settings, searchParams, workItemList, settingsVisible, errorMessage, loading };
  },
  methods: {
    saveSettings(settings: SettingsModel) {
      this.settings = settings;
      if (settings.saveToLocalStorage) {
        saveSettings(settings);
      }
      this.settingsVisible = false;
    },
    async getWorkItems(searchParams: SearchParams) {
      this.errorMessage = '';
      this.searchParams = searchParams;
      if(!this.settings.apiKey) {
        this.errorMessage = 'No API Key provided, please provide one in the settings.'
        return;
      }

      saveSearchParams(searchParams);
      try {        
        this.loading = true;
        this.workItemList = await devopsApi.getWorkItemsBetweenBuilds(
          this.settings.apiKey,
          this.searchParams.fromBuildId,
          this.searchParams.toBuildId
          );
        } catch (error) {
          this.errorMessage = `Unable to fetch results: ${error}`
        } finally {
          this.loading = false;
        }
    },
  }, 
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
  background-color: var(--surface-900);
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
