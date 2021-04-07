import { ref, customRef } from 'vue'

const debounce = (fn: any , delay = 0, immediate = false) => {
  let timeout: any
  return (...args : any[]) => {
    if (immediate && !timeout) fn(...args)
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

function useDebouncedRef<T>(initialValue: T, delay: number, immediate = false) {
  const state = ref<T>(initialValue)
  const debouncedRef = customRef<T>((track, trigger) => ({
    get() {
      track()
      return state.value as any
    },
    set: debounce(
      (value: any) => {
        state.value = value
        trigger()
      },
      delay,
      immediate
    ),
  }))
  return debouncedRef
}

export default useDebouncedRef