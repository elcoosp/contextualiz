import React, { Component } from 'react'
import CounterContext from './CounterContext'

const { consumeCounter, CounterProvider } = CounterContext

const Count = consumeCounter(
  ({ counter: { count, _increment, _decrement } }) => (
    <div className="App">
      <button onClick={() => _increment(6)}>inc</button>
      <button onClick={_decrement}>dec</button>
      <p>{count}</p>
    </div>
  )
)

const Count2 = consumeCounter(
  ({ counter: { count, _increment, _decrement, plop } }) => (
    <div className="App">
      <p>{plop}</p>
      <button onClick={() => _increment(6)}>inc</button>
      <button onClick={_decrement}>dec</button>
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
          <CounterProvider>
            <Count2 />
          </CounterProvider>
        </CounterProvider>
      </div>
    )
  }
}

export default App
