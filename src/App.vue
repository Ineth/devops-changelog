<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Menu />
      <Message v-if="errorMessage" severity="error" :closable="false">{{
        errorMessage
      }}</Message>
    </div>

    <div v-if="!store.state.welcomeMessageShown" class="p-col-12">
      <Card>
        <template #title> Welcome </template>
        <template #content>
          This small tool allows you to see DevOps work items that are included
          between 2 given build ids.
          <br />
          <br />
          <strong>Note:</strong> Provide your API key in the settings.
        </template>
        <template #footer>
          <div class="p-grid p-jc-end">
            <div class="p-col" style="display: flex; justify-content: flex-end">
              <Button
                label="Ok"
                icon="pi pi-check"
                @click="closeWelcomeMessage"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="p-col-12">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Button from 'primevue/button';

import devopsApi from './api/devops.api';
import { SearchParams } from './models/SearchParams';
import { getSearchParams, saveSearchParams } from './api/localstorage.api';
import { useStore } from './store';
import { Mutations } from './store/mutations.enum';

export default defineComponent({
  name: 'App',
  components: {
    Card,
    Message,
    Button,
  },
  setup: () => {
    const store = useStore();
    const searchParams: Ref<SearchParams> = ref(getSearchParams());
    const fromBuildIdDetails: Ref<any> = ref(undefined);
    const toBuildIdDetails: Ref<any> = ref(undefined);

    const workItemList = ref(undefined);
    const errorMessage = ref('');
    const loading = ref(false);

    return {
      store,
      searchParams,
      fromBuildIdDetails,
      toBuildIdDetails,
      workItemList,
      errorMessage,
      loading,
    };
  },
  methods: {
    closeWelcomeMessage() {
      this.store.commit(Mutations.SET_WELCOME_MESSAGE_SHOWN);
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
  color: var(--text-color-secondary);
  margin: 1rem;
}

a {
  color: rgb(230, 234, 245);
}
</style>
