import React, { Component } from 'react'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const contextualiz = ([contextName]) => (initState, initActions) => {
  const { Provider, Consumer } = React.createContext()

  class CustomProvider extends Component {
    state = initState

    // Create context actions passed as value to the Provider in render
    getActions = () =>
      Object.entries(initActions).reduce((acc, [key, func]) => {
        acc[`_${key}`] = (...args) =>
          this.setState(state => ({ ...func(...args)(state) }))
        return acc
      }, {})

    render() {
      return (
        <Provider
          value={{
            ...this.state,
            ...this.getActions()
          }}
        >
          {this.props.children}
        </Provider>
      )
    }
  }

  const withConsumer = Component => props => (
    <Consumer>
      {/* Inject the context value under a prop corresponding to the variable contextName */}
      {value => <Component {...{ [contextName]: value }} {...props} />}
    </Consumer>
  )

  const capitalizedContextName = capitalize(contextName)
  return {
    [`${capitalizedContextName}Provider`]: CustomProvider,
    [`consume${capitalizedContextName}`]: withConsumer
  }
}

export default contextualiz
