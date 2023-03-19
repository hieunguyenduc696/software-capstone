declare namespace AppHeaderModuleLessNamespace {
  export interface IAppHeaderModuleLess {
    avatar: string
    breadcrumb: string
    'dropdown-menu-topbar': string
    'icon-logout': string
    name: string
    'notification-icon': string
    'top-header': string
    'top-header-setting': string
    user: string
  }
}

declare const AppHeaderModuleLessModule: AppHeaderModuleLessNamespace.IAppHeaderModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppHeaderModuleLessNamespace.IAppHeaderModuleLess
}

export = AppHeaderModuleLessModule
