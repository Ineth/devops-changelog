<template>
  <div class="card">
    <h2>Settings</h2>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12">
        <label for="ApiKey">API Key</label>
        <InputText id="ApiKey" type="text" v-model="settings.apiKey" />
      </div>
      <div class="p-field-checkbox p-col-12">
        <Checkbox v-model="settings.saveToLocalStorage" :binary="true" />
        <label for="binary">Save in localstorage</label>
      </div>
    </div>
    <div class="p-grid p-jc-end">
      <div class="p-col" style="display: flex; justify-content: flex-end">
        <Button
          class="p-mr-2"
          label="Cancel"
          icon="pi"
          @click="$emit('close-settings')"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          @click="$emit('save-settings', settings)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { Settings } from '../models/Settings';

export default defineComponent({
  name: 'Settings',
  props: {
    settings: Object,
  },
  emits: ['close-settings', 'save-settings'],
  components: {
    InputText,
    Button,
    Checkbox,
  },
  setup(props) {
    const settings: Ref<Settings> = ref(props.settings as Settings);

    return { settings };
  },
});
</script>
