export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state:cart')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    // We return undefined to allow our reducers to save the state, even when there is nothing in local storage.
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state:cart', serializedState)
  } catch (err) {
    // Ignore write errors
  }
}
