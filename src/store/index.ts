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

export interface State {
  settings: Settings;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    settings: {
      apiKey: '',
      organization: '',
      project: '',
      saveToLocalStorage: false,
    },
  },
  mutations: {
    [Mutations.SET_SETTINGS](state, settings: Settings) {
      state.settings = settings;
    },
  },
  plugins: [createLogger(), createPersistedState()],
});

export function useStore() {
  return baseUseStore(key);
}
