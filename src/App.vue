<template>
  <div class="p-fluid p-formgrid p-grid">
    <div class="p-fluid p-col-12 p-mb-2">
      <span class="p-float-label">
        <InputText id="DevOpsApiKey" type="text" v-model="apiKey" />
        <label for="DevOpsApiKey">DevOps API Key</label>
      </span>
    </div>
    <span class="p-float-label p-col-6 p-mb-2">
      <InputText id="FromBuildID" type="text" v-model="fromBuildId" />
      <label for="FromBuildID">From Build ID</label>
    </span>
    <span class="p-float-label p-col-6 p-mb-2">
      <InputText id="ToBuildId" type="text" v-model="toBuildId" />
      <label for="ToBuildId">Build ID</label>
    </span>
    <div class="p-fluid p-col-12">
      <Button
        label="Find"
        class="p-button-primary"
        icon="pi pi-check"
        iconPos="right"
        @click="getWorkItems"
      />
    </div>
  </div>

  <div class="p-grid">
    <Card class="p-col-4" v-for="workItem in workItemList" :key="workItem.id">
      <template #title>
        <a :href="workItem.url" target="_blank"
          >{{ workItem.id }} - {{ workItem.title }}</a
        >
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import HelloWorld from './components/HelloWorld.vue';
import base64 from 'base-64';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    InputText,
    Button,
    Card,
  },
  setup: () => {
    const apiKey = ref('a7lpk4hhgbuzvpqehnicwa3hf6hy5wrkn2sel57aphqpjzklgdfq');
    const fromBuildId = ref('117646');
    const toBuildId = ref('119288');
    const workItemList = ref(undefined);

    return { apiKey, fromBuildId, toBuildId, workItemList };
  },
  methods: {
    async getWorkItems() {
      let url = `https://dev.azure.com/xeriusit/xerius2020/_apis/build/workitems?fromBuildId=${this.fromBuildId}&toBuildId=${this.toBuildId}&$top=100&api-version=6.0-preview.2`;
      let username = 'user';

      let headers = new Headers();

      headers.set(
        'Authorization',
        'Basic ' + base64.encode(username + ':' + this.apiKey)
      );
      headers.set('Content-Type', 'application/json');

      const workItemDiff = await (
        await fetch(url, {
          method: 'GET',
          headers: headers,
        })
      ).json();
      console.log('results: ', workItemDiff);

      const workItemIds = workItemDiff.value.map((item: any) => item.id);
      console.log('workItemIds: ', workItemIds);

      url =
        'https://dev.azure.com/xeriusit/xerius2020/_apis/wit/workitemsbatch?api-version=6.0';

      const body = {
        ids: workItemIds,
        fields: ['System.Id', 'System.Title', 'System.WorkItemType'],
      };

      const workItems = await (
        await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        })
      ).json();
      console.log('workItems: ', workItems);
      //dev.azure.com/xeriusit/Xerius2020/_workitems/edit/55717
      //dev.azure.com/xeriusit/_apis/wit/workItems/56706
      this.workItemList = workItems.value.map((item: any) => ({
        id: item.id,
        url: item.url.replace(
          '_apis/wit/workItems',
          'Xerius2020/_workitems/edit'
        ),
        title: item.fields['System.Title'],
      }));
    },
  },
});
</script>

<style></style>
