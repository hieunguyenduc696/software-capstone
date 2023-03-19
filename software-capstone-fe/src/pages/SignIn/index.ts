import { lazy } from 'react'

export * from './SignIn.route'

export const SignIn = lazy(
  () => import('./SignIn' /* webpackChunkName: "Page_SignIn" */)
)
