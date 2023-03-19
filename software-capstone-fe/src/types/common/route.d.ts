import React from 'react'
import { IconType } from 'react-icons'
import { TKeyPermission, TPortalPages } from 'types/models'

export type TRoute = {
  path: string
  redirectTo?: string
  exact?: boolean
  component: React.ComponentType
  children?: TRoute[]
  page?: TPortalPages
  permission?: TKeyPermission
  breadcrumb?: string
  showInMenu?: boolean
  menuIcon?: IconType
  menuLabel?: string
}

export type TParameters = {
  id: string
}
