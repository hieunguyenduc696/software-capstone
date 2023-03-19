import { lazy } from 'react'

export * from './NotFound.route'

export const NotFound = lazy(
  () => import('./NotFound' /* webpackChunkName: "Page_NotFound" */)
)
