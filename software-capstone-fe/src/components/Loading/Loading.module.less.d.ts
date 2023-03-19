declare namespace LoadingModuleLessNamespace {
  export interface ILoadingModuleLess {
    'overlay-loading': string
  }
}

declare const LoadingModuleLessModule: LoadingModuleLessNamespace.ILoadingModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoadingModuleLessNamespace.ILoadingModuleLess
}

export = LoadingModuleLessModule
