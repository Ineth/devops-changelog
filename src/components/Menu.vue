<template>
  <Menubar :model="menuItems">
    <template #start>
      <div class="p-formgroup-inline">
        <div class="p-field">
          <label for="FromBuildID">From Build ID</label>
          <InputText
            id="FromBuildID"
            type="text"
            v-model="searchParams.fromBuildId"
          />
        </div>
        <div class="p-field">
          <label for="ToBuildId">To Build ID</label>
          <InputText
            id="ToBuildId"
            type="text"
            v-model="searchParams.toBuildId"
          />
        </div>
        <Button
          @click="$emit('search-workitems', searchParams)"
          icon="pi pi-search"
        />
      </div>
    </template>
  </Menubar>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { defineComponent, Ref, ref } from 'vue';
import { SearchParams } from '../models/SearchParams';

export default defineComponent({
  name: 'Menu',
  props: {
    searchParams: Object,
  },
  emits: ['open-settings', 'search-workitems'],
  components: {
    Menubar,
    InputText,
    Button,
  },
  setup(props, { emit }) {
    const menuItems = ref([
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: (event: any) => {
          // event.originalEvent: Browser event
          // event.item: Menuitem instance
          emit('open-settings');
        },
      },
    ]);

    const searchParams: Ref<SearchParams> = ref(
      props.searchParams as SearchParams
    );

    return { menuItems, searchParams };
  },
});
</script>

<style></style>
