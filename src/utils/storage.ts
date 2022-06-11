export const getItem = (name: string) => {
  const data: any = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name: string, value: string) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  window.localStorage.setItem(name, value)
}

export const removeItem = (name: string) => {
  window.localStorage.removeItem(name)
}
