<template>
  <Card>
    <template #content>
      <div class="p-d-flex p-jc-between">
        <div class="menu-items">
          <Button
            @click="$router.push('/')"
            label="Changelog"
            class="p-button-link"
          /><Button
            @click="$router.push('/pull-requests')"
            label="Pull Requests"
            class="p-button-link"
          />
        </div>
        <div>
          <Button
            @click="$router.push('/settings')"
            icon="pi pi-cog"
            label="Settings"
            class="p-button-link"
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

/* TODO: avtive router link style */
.router-link-active {
  /* background-color: var(--blue-500); */
  /* border-color: var(--blue-800); */
  /* box-shadow: 0 0 0 1px #93cbf9 !important; */
}
</style>
