import React from 'react'

export function withAuthorization<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => {
    return <Component {...props} />
  }
}
