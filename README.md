# contextualiz

## Usage

The contextualiz function take the context name as a template literal and return a function which take two objects :

    - The initial value of the context
    - Some actions to change the context value

Once contextualiz is fully called it return a consumer and provider prefixed with the context name, as follow :

```javascript
const { consumeCounter, CounterProvider } = contextualiz`counter`(
  {
    count: 6
  },
  {
    increment: num => ({ count }) => ({ count: count + num }),
    decrement: () => ({ count }) => ({ count: count - 1 })
  }
)
```

The consumer is a function taking a component funciton with injected props (actions prefixed with an underscore). The provider is a normal provider component.

```javascript
const Count = consumeCounter(
  ({ counter: { count, _increment, _decrement } }) => (
    <div className="App">
      <button onClick={() => _increment(6)}>Increment</button>
      <button onClick={_decrement}>Decrement</button>
      <p>{count}</p>
    </div>
  )
)

class App extends Component {
  render() {
    return (
      <div>
        <CounterProvider>
          <Count />
        </CounterProvider>
      </div>
    )
  }
}
```
