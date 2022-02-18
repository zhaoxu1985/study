let isRun = true
let timer = null

export const throttle = function(fn, time) {
  if (!isRun) {
    return
  }
  isRun = false
  setTimeout(() => {
    fn()
    isRun = true
  }, time)
}
export const debounce = function(fn, time) {
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, time)
  }
}
