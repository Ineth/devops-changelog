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
        @save-settings=""
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

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Settings,
    WorkItemTable,
    Card,
  },
  setup: () => {
    const settings: Ref<SettingsModel> = ref({
      apiKey: 'a7lpk4hhgbuzvpqehnicwa3hf6hy5wrkn2sel57aphqpjzklgdfq',
      saveToLocalStorage: false,
    });
    const searchParams: Ref<SearchParams> = ref({
      fromBuildId: '117646',
      toBuildId: '119288',
    });

    const settingsVisible = ref(false);

    const workItemList = ref(undefined);

    return { settings, searchParams, workItemList, settingsVisible };
  },
  methods: {
    saveSettings(settings: SettingsModel) {
      if (settings.saveToLocalStorage) {
        localStorage.setItem('apiKey', settings.apiKey);
      }
    },
    async getWorkItems(searchParams: SearchParams) {
      this.searchParams = searchParams;
      this.workItemList = await devopsApi.getWorkItemsBetweenBuilds(
        this.settings.apiKey,
        this.searchParams.fromBuildId,
        this.searchParams.toBuildId
      );
    },
  },
});
</script>

<style>
html {
  font-size: 16px;
}
</style>
