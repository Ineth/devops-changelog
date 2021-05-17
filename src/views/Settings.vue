<template>
  <Card>
    <template #title>
      <h2>Settings</h2>
    </template>
    <template #content>
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12">
          <label for="Organization">Organization</label>
          <InputText
            id="Organization"
            type="text"
            v-model="settings.organization"
          />
        </div>
        <div class="p-field p-col-12">
          <label for="Project">Project</label>
          <InputText id="Project" type="text" v-model="settings.project" />
        </div>
        <div class="p-field p-col-12">
          <label for="ApiKey">API Key</label>
          <InputText id="ApiKey" type="text" v-model="settings.apiKey" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="p-grid p-jc-end">
        <div class="p-col" style="display: flex; justify-content: flex-end">
          <Button label="Save" icon="pi pi-check" @click="saveSettings()" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import { Settings } from '@/store/models/Settings';
import { useStore } from '@/store';
import { Mutations } from '@/store/mutations.enum';

export default defineComponent({
  name: 'Settings',
  components: {
    InputText,
    Button,
    Checkbox,
    Card,
    Dialog,
  },
  setup() {
    const store = useStore();
    const settings: Ref<Settings> = ref(store.state.settings);

    return { store, settings };
  },
  methods: {
    saveSettings() {
      this.store.commit(Mutations.SET_SETTINGS, this.settings);
      this.$router.push('/');
    },
  },
});
</script>
