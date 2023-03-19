declare namespace SignInModuleLessNamespace {
  export interface ISignInModuleLess {
    auth: string
    'auth-container': string
    'auth-screen-container': string
    'background-context': string
    'flex-center-item': string
    header: string
    'header-description': string
    'header-image': string
    'header-system': string
    'header-welcome': string
    'option-link-text': string
    'submit-button': string
  }
}

declare const SignInModuleLessModule: SignInModuleLessNamespace.ISignInModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SignInModuleLessNamespace.ISignInModuleLess
}

export = SignInModuleLessModule
