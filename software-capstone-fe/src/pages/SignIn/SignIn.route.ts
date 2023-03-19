import SignIn from './SignIn'
import { RootPaths } from 'constant'
import { TRoute } from 'types'

export const SignInRoutes: TRoute = {
  path: RootPaths.SIGN_IN,
  component: SignIn,
  page: 'accessible',
}
