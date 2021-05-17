<template>
  <div class="p-grid">
    <div class="p-col-12">
      <SearchBar
        :searchParams="searchParams"
        :loading="loading"
        :fromBuildIdDetails="fromBuildIdDetails"
        :toBuildIdDetails="toBuildIdDetails"
        @open-settings="settingsVisible = !settingsVisible"
        @search-workitems="getWorkItems($event)"
        @from-build-id-changed="getBuildDetails($event, true)"
        @to-build-id-changed="getBuildDetails($event, false)"
      />
      <Message v-if="errorMessage" severity="error" :closable="false">{{
        errorMessage
      }}</Message>
    </div>

    <div class="p-col-12">
      <WorkItemTable :work-items="workItemList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Button from 'primevue/button';

import { Settings as SettingsModel } from '@/models/Settings';
import devopsApi from '@/api/devops.api';
import { SearchParams } from '@/models/SearchParams';
import {
  getSearchParams,
  getSettings,
  getShowWelcomeMessage,
  saveSearchParams,
  saveSettings,
  saveShowWelcomeMessage,
} from '@/api/localstorage.api';

export default defineComponent({
  name: 'Changelog',
  components: {
    Card,
    Message,
    Button,
  },
  setup: () => {
    const settings: Ref<SettingsModel> = ref(getSettings());
    const searchParams: Ref<SearchParams> = ref(getSearchParams());
    const fromBuildIdDetails: Ref<any> = ref(undefined);
    const toBuildIdDetails: Ref<any> = ref(undefined);
    const showWelcomeMessage = ref(getShowWelcomeMessage());

    const settingsVisible = ref(false);
    const workItemList = ref(undefined);
    const errorMessage = ref('');
    const loading = ref(false);

    return {
      settings,
      searchParams,
      fromBuildIdDetails,
      toBuildIdDetails,
      workItemList,
      settingsVisible,
      errorMessage,
      loading,
      showWelcomeMessage,
    };
  },
  mounted() {
    if (this.searchParams?.fromBuildId) {
      this.getBuildDetails(this.searchParams.fromBuildId, true);
    }

    if (this.searchParams?.toBuildId) {
      this.getBuildDetails(this.searchParams.toBuildId, false);
    }
  },
  methods: {
    closeWelcomeMessage() {
      this.showWelcomeMessage = false;
      saveShowWelcomeMessage(this.showWelcomeMessage);
    },
    saveSettings(settings: SettingsModel) {
      this.settings = settings;
      if (settings.saveToLocalStorage) {
        saveSettings(settings);
      }
      this.settingsVisible = false;
    },
    async getBuildDetails(buildId: string, from: boolean) {
      let details = undefined;
      try {
        const buildDetails = await devopsApi.getBuildById(
          this.settings,
          buildId
        );
        details = {
          link: buildDetails._links.web.href,
          buildNumber: buildDetails.buildNumber,
          pipeline: {
            name: buildDetails.definition.name,
            link: buildDetails.definition.url,
          },
          repo: {
            name: buildDetails.repository.name,
            link: buildDetails.repository.url,
          },
        };
      } catch {
        details = null;
      }

      if (from) {
        this.fromBuildIdDetails = details;
      } else {
        this.toBuildIdDetails = details;
      }
    },
    async getWorkItems(searchParams: SearchParams) {
      this.errorMessage = '';
      this.searchParams = searchParams;
      if (!this.settings.apiKey) {
        this.errorMessage =
          'No API Key provided, please provide one in the settings.';
        return;
      }

      saveSearchParams(searchParams);
      try {
        this.loading = true;
        this.workItemList = await devopsApi.getWorkItemsBetweenBuilds(
          this.settings,
          this.searchParams.fromBuildId,
          this.searchParams.toBuildId
        );
      } catch (error) {
        this.errorMessage = `Unable to fetch results: ${error}`;
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped></style>
