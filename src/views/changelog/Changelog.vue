<template>
  <div class="p-grid">
    <div class="p-col-12">
      <SearchBar />
      <!-- :searchParams="searchParams"
        :loading="loading"
        :fromBuildIdDetails="buildDetails?.from"
        :toBuildIdDetails="buildDetails?.to"
        @search-workitems="getWorkItems($event)"
        @from-build-id-changed="getBuildDetails($event, true)"
        @to-build-id-changed="getBuildDetails($event, false)" -->
      <Message v-if="errorMessage" severity="error" :closable="false">{{
        errorMessage
      }}</Message>
    </div>

    <div class="p-col-12">
      <WorkItemTable :work-items="workItems" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Button from 'primevue/button';

import devopsApi from '@/api/devops.api';
import { SearchParams } from '@/store/models/Changelog';
import { useStore } from '@/store';
import { Mutations } from '@/store/mutations.enum';

export default defineComponent({
  name: 'Changelog',
  components: {
    Card,
    Message,
    Button,
  },
  setup: () => {
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);

    return {
      store,
      searchParams: computed(() => store.state.changelog.searchParams),
      buildDetails: computed(() => store.state.changelog.buildDetails),
      workItems: computed(() => store.state.changelog.workItems),
      errorMessage,
      loading,
    };
  },
  mounted() {
    // TODO: possible side effect for the store ?
    if (this.searchParams?.fromBuildId) {
      this.getBuildDetails(this.searchParams.fromBuildId, true);
    }

    if (this.searchParams?.toBuildId) {
      this.getBuildDetails(this.searchParams.toBuildId, false);
    }
  },
  methods: {
    async getBuildDetails(buildId: string, from: boolean) {
      let details = undefined;
      try {
        const buildDetails = await devopsApi.getBuildById(
          this.store.state.settings,
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
        this.store.commit(Mutations.UPDATE_CHANGELOG_BUILD_DETAILS, {
          from: buildId,
        });
      } else {
        this.store.commit(Mutations.UPDATE_CHANGELOG_BUILD_DETAILS, {
          to: buildId,
        });
      }
    },
    async getWorkItems(searchParams: SearchParams) {
      this.errorMessage = '';
      this.searchParams = searchParams;
      if (!this.store.state.settings.apiKey) {
        this.errorMessage =
          'No API Key provided, please provide one in the settings.';
        return;
      }

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
