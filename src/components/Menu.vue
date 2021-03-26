<template>
  <Card>
    <template #content>
      <div class="p-d-flex p-jc-between">

        <div class="p-formgroup-inline">
          <div class="p-field">
            <label for="FromBuildID">From Build ID</label>
            <InputText
            id="FromBuildID"
            type="text"
            v-model="searchParams.fromBuildId"
            @keyup.enter="$emit('search-workitems', searchParams)"
            />
          </div>
          <div class="p-field">
            <label for="ToBuildId">To Build ID</label>
            <InputText
            id="ToBuildId"
            type="text"
            v-model="searchParams.toBuildId"
            @keyup.enter="$emit('search-workitems', searchParams)"
            />
          </div>
          <Button
          @click="$emit('search-workitems', searchParams)"
          icon="pi pi-search"
          />
        </div>
        <div>
          <Button
          @click="$emit('open-settings')"
          icon="pi pi-cog"
          label="Settings"
          />
        </div>
      </div>
      <ProgressBar v-if="loading" mode="indeterminate" style="height: .5em" />
    </template>
    <template #end>
     
    </template>
  </Card>
</template>

<script lang="ts">
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';

import { defineComponent, Ref, ref } from 'vue';
import { SearchParams } from '../models/SearchParams';

export default defineComponent({
  name: 'Menu',
  props: {
    searchParams: Object,
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open-settings', 'search-workitems'],
  components: {
    Menubar,
    InputText,
    Button,
    Card,
    ProgressBar
  },
  setup(props) {
    const searchParams: Ref<SearchParams> = ref(
      props.searchParams as SearchParams
    );

    return { searchParams };
  },
});
</script>

<style></style>
