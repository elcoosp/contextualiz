import contextualiz from './contextualiz'
export default contextualiz`counter`(
  {
    count: 6,
    plop: 'plop'
  },
  {
    increment: num => ({ count }) => ({ count: count + num }),
    decrement: () => ({ count }) => ({ count: count - 1 })
  }
)
