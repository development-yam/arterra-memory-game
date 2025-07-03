export const level = {
  state: {
    levels: [2, 4, 6, 8],
    current: 4,
  },
  reducers: {
    reset(state) {
      return { ...state, current: 4 }
    },
    change(state, payload) {
      return { ...state, current: payload }
    },
  },
}
