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
              v-model="fromBuildId"
              @keyup.enter="
                $emit('search-workitems', { fromBuildId, toBuildId })
              "
            />
          </div>

          <div class="p-d-flex p-flex-column p-ml-2">
            <div class="p-field">
              <label for="ToBuildId">To Build ID</label>
              <InputText
                id="ToBuildId"
                type="text"
                v-model="toBuildId"
                @keyup.enter="
                  $emit('search-workitems', { fromBuildId, toBuildId })
                "
              />
            </div>
          </div>
          <Button
            @click="$emit('search-workitems', { fromBuildId, toBuildId })"
            icon="pi pi-search"
          />
        </div>
      </div>

      <div
        class="p-grid p-mt-2 p-mb-2"
        v-if="fromBuildIdDetails || toBuildIdDetails"
      >
        <Card v-if="fromBuildIdDetails" class="detail-card">
          <template #content>
            Build:
            <a :href="fromBuildIdDetails.link" target="_blank">{{
              fromBuildIdDetails.buildNumber
            }}</a>
            <br />
            Pipeline:
            <a :href="fromBuildIdDetails.pipeline.link" target="_blank">{{
              fromBuildIdDetails.pipeline.name
            }}</a>
            <br />
            Repo:
            <a :href="fromBuildIdDetails.repo.link" target="_blank">{{
              fromBuildIdDetails.repo.name
            }}</a>
          </template>
        </Card>

        <div class="p-d-flex p-flex-column p-jc-center p-m-2">
          <i class="pi pi-angle-double-right" style="font-size: 2rem"></i>
        </div>

        <Card v-if="toBuildIdDetails" class="detail-card">
          <template #content>
            Build:
            <a :href="toBuildIdDetails.link" target="_blank">{{
              toBuildIdDetails.buildNumber
            }}</a>
            <br />
            Pipeline:
            <a :href="toBuildIdDetails.pipeline.link" target="_blank">{{
              toBuildIdDetails.pipeline.name
            }}</a>
            <br />
            Repo:
            <a :href="toBuildIdDetails.repo.link" target="_blank">{{
              toBuildIdDetails.repo.name
            }}</a>
          </template>
        </Card>
      </div>

      <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
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

import { computed, defineComponent, Ref, watch } from 'vue';
import useDebouncedRef, { debounce } from '@/composables/useDebouncedRef';
import { useStore } from '@/store';
import { Actions } from '@/store/actions.enum';
import { SearchParams } from '@/store/models/Changelog';

export default defineComponent({
  name: 'Menu',
  props: {
    searchParams: Object,
    loading: {
      type: Boolean,
      default: false,
    },
    fromBuildIdDetails: {
      type: Object,
      default: undefined,
    },
    toBuildIdDetails: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['search-workitems', 'from-build-id-changed', 'to-build-id-changed'],
  components: {
    Menubar,
    InputText,
    Button,
    Card,
    ProgressBar,
  },
  setup(props, context) {
    const store = useStore();
    // const fromBuildId: Ref<string> = useDebouncedRef<string>(
    //   props.searchParams?.fromBuildId,
    //   400
    // );
    // const toBuildId: Ref<string> = useDebouncedRef<string>(
    //   props.searchParams?.toBuildId,
    //   400
    // );

    // watch(fromBuildId, (newFromBuildId) => {
    //   context.emit('from-build-id-changed', newFromBuildId);
    // });

    // watch(toBuildId, (newtoBuildId) => {
    //   context.emit('to-build-id-changed', newtoBuildId);
    // });

    // return { fromBuildId: computed(()), toBuildId };
    return { store };
  },
  computed: {
    fromBuildId: {
      get() {
        this.store.state.changelog.searchParams?.fromBuildId;
      },
      set(value: any) {
        console.log('set ~ value', value);
        this.store.dispatch(Actions.UPDATE_SEARCH_PARAMS, {
          fromBuildId: value,
        } as SearchParams);
      },
    },
    toBuildId: {
      get() {
        this.store.state.changelog.searchParams?.toBuildId;
      },
      set: debounce(function (value: any) {
        console.log('set ~ value', value);
        this.store.dispatch(Actions.UPDATE_SEARCH_PARAMS, {
          toBuildId: value,
        } as SearchParams);
      }, 400),
    },
  },
});
</script>

<style>
.detail-card {
  background-color: var(--surface-300) !important;
}
</style>
