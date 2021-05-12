<template>
  <Card>
    <template #content>
      <div class="p-d-flex p-jc-end">
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
