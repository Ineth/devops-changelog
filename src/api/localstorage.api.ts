import { SearchParams } from '../models/SearchParams';
import { Settings } from '../models/Settings';

const showWelcomeMessage = 'showWelcomeMessage';
const searchParamsKey = 'searchParams';
const settingsKey = 'settings';

export function saveShowWelcomeMessage(value: boolean) {
  localStorage.setItem(showWelcomeMessage, JSON.stringify(value));
}

export function getShowWelcomeMessage(): boolean {
  const value = localStorage.getItem(showWelcomeMessage);
  if (!value) {
    return true;
  }
  return JSON.parse(value);
}

export function saveSearchParams(searchParams: SearchParams) {
  localStorage.setItem(searchParamsKey, JSON.stringify(searchParams));
}

export function getSearchParams(): SearchParams {
  const searchParams = localStorage.getItem(searchParamsKey);
  if (!searchParams) {
    return {
      fromBuildId: '',
      toBuildId: '',
    };
  }
  return JSON.parse(searchParams);
}

export function saveSettings(settings: Settings) {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

export function getSettings(): Settings {
  const settings = localStorage.getItem(settingsKey);
  if (!settings) {
    return {
      apiKey: '',
      saveToLocalStorage: false,
    };
  }
  return JSON.parse(settings);
}
