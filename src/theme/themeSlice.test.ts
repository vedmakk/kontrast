import { describe, it, expect } from 'bun:test'
import { setTheme, toggleTheme } from './themeSlice'
import { createStore } from '../store'
import { selectTheme } from './selectors'

describe('themeSlice', () => {
  it(`should handle ${toggleTheme.type} action`, () => {
    const store = createStore()
    const getTheme = () => selectTheme(store.getState())

    expect(getTheme()).toEqual('light')
    store.dispatch(toggleTheme())
    expect(getTheme()).toEqual('dark')
  })
  it(`should handle ${setTheme.type} action`, () => {
    const store = createStore()
    const getTheme = () => selectTheme(store.getState())

    expect(getTheme()).toEqual('light')
    store.dispatch(setTheme('dark'))
    expect(getTheme()).toEqual('dark')
  })
})
