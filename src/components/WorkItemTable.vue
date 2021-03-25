<template>
  <DataTable v-if="workItems" :value="workItems">
    <Column field="id" header="Id" :sortable="true" style="width: 100px">
      <template #body="slotProps">
        <a :href="slotProps.data.url" target="_blank">{{
          slotProps.data.id
        }}</a>
      </template>
    </Column>
    <Column field="title" header="Title"></Column>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineComponent({
  name: 'WorkItemTable',
  props: {
    workItems: Array,
  },
  components: {
    DataTable,
    Column,
  },
});
</script>
