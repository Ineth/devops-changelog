<template>
  <Card>
    <template #content>
      <div class="p-d-flex p-jc-between">
        <div class="menu-items">
          <router-link to="/" class="p-button">Changelog</router-link>
          <router-link to="/pull-requests" class="p-button"
            >Pull Requests</router-link
          >
        </div>
        <div>
          <Button
            @click="$emit('open-settings')"
            icon="pi pi-cog"
            label="Settings"
          />
        </div>
      </div>
    </template>
    <template #end> </template>
  </Card>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu',
  emits: ['open-settings'],
  components: {
    Menubar,
    InputText,
    Button,
    Card,
    ProgressBar,
  },
});
</script>

<style scoped>
.menu-items a {
  margin-right: 0.5rem;
}

.router-link-active {
  background-color: var(--blue-500);
  border-color: var(--blue-800);
  box-shadow: none !important;
}
</style>
