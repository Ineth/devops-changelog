<template>
  <Card v-if="workItems">
    <template #content>
      <DataTable :value="workItems">
        <Column field="id" header="Id" :sortable="true" style="width: 70px">
          <template #body="slotProps">
            <a class="p-text-normal" :href="slotProps.data.url" target="_blank">{{
              slotProps.data.id
            }}</a>
          </template>
        </Column>
        <Column field="type" header="Type" :sortable="true" style="width: 100px;"></Column>
        <Column field="title" header="Title" :sortable="true"></Column>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';

export default defineComponent({
  name: 'WorkItemTable',
  props: {
    workItems: Array,
  },
  components: {
    DataTable,
    Column,
    Card,
  },
});
</script>
