import { InjectionKey } from '@vue/runtime-core';
import { Settings } from './models/Settings';
import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore,
} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { Mutations } from './mutations.enum';
import { BuildDetails, Changelog, SearchParams } from './models/Changelog';
import { Actions } from './actions.enum';

export interface State {
  loading: boolean;
  welcomeMessageShown: boolean;
  settings: Settings;
  changelog: Changelog;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    loading: false,
    welcomeMessageShown: false,
    settings: {
      apiKey: '',
      organization: '',
      project: '',
    },
    changelog: {
      workItems: [],
    },
  },
  mutations: {
    [Mutations.SET_SETTINGS](state, settings: Settings) {
      state.settings = settings;
    },
    [Mutations.SET_WELCOME_MESSAGE_SHOWN](state) {
      state.welcomeMessageShown = true;
    },
    [Mutations.UPDATE_CHANGELOG_BUILD_DETAILS](
      state,
      buildDetails: BuildDetails
    ) {
      state.changelog.buildDetails = {
        ...state.changelog.buildDetails,
        ...buildDetails,
      };
    },
    [Mutations.UPDATE_SEARCH_PARAMS](state, searchParams: SearchParams) {
      state.changelog.searchParams = {
        ...state.changelog.searchParams,
        ...searchParams,
      };
    },
  },
  actions: {
    [Actions.UPDATE_SEARCH_PARAMS]({ commit }, searchParams: SearchParams) {
      commit(Mutations.UPDATE_SEARCH_PARAMS, searchParams);
    },
  },
  plugins: [createLogger(), createPersistedState()],
});

export function useStore() {
  return baseUseStore(key);
}
