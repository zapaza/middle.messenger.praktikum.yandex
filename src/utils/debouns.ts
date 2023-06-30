let timerId: number;

export function debounceFunction(func: () => void, delay: number) {
  window.clearTimeout(timerId);

  timerId = window.setTimeout(func, delay);
}
