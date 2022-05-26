import {
  Home as HomeIcon,
  BarChartOutlined as DashboardIcon,
  CodeOutlined as CodeIcon,
  GitHub as GitHubIcon,
  Public as PublicIcon,
  PublicOff as PrivateIcon,
  AccountBoxRounded as UserIcon,
  SettingsOutlined as SettingsIcon,
  ListAlt as ListIcon,
  CreditCard as BillingIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Task as TaskIcon,
} from '@mui/icons-material';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';
import { Task } from '../pages/Task';

import { User } from '../services/auth';
import { Route } from '../types/Route';

const loggedInUser = (user: null | User) => user !== null
const unLoggedInUser = (user: null | User) => !loggedInUser(user)

const routes: Array<Route> = [
  {
    key: 'router-home',
    title: 'Home',
    description: 'Home',
    component: Home,
    path: '/',
    isEnabled: true,
    icon: HomeIcon,
    appendDivider: true,
    shouldDisplay: loggedInUser,
  },
  {
    key: 'router-dashboard',
    title: 'Dashboard',
    description: 'Dashboard',
    path: '/dashboard',
    isEnabled: false,
    icon: DashboardIcon,
    shouldDisplay: () => false,
  },
  {
    key: 'router-gh',
    title: 'GitHub',
    description: 'GitHub',
    isEnabled: false,
    icon: GitHubIcon,
    shouldDisplay: () => false,
    subRoutes: [
      {
        key: 'router-gh-public',
        title: 'Public Repos',
        description: 'Public Repos',
        path: '/gh/public',
        isEnabled: true,
        icon: PublicIcon,
        shouldDisplay: loggedInUser,
      },
      {
        key: 'router-gh-private',
        title: 'Private Repos',
        description: 'Private Repos',
        path: '/gh/private',
        isEnabled: false,
        icon: PrivateIcon,
        shouldDisplay: loggedInUser,
      },
    ],
  },
  {
    key: 'router-code',
    title: 'Code Editor',
    description: 'Code Editor',
    path: '/code-editor',
    isEnabled: false,
    icon: CodeIcon,
    appendDivider: true,
    shouldDisplay: () => false,
  },
  {
    key: 'router-my-account',
    title: 'My Account',
    description: 'My Account',
    path: '/account',
    isEnabled: true,
    icon: UserIcon,
    shouldDisplay: loggedInUser,
    subRoutes: [
      {
        key: 'router-settings',
        title: 'Settings',
        description: 'Account Settings',
        path: '/account/settings',
        isEnabled: true,
        icon: SettingsIcon,
        shouldDisplay: loggedInUser,
      },
      {
        key: 'router-preferences',
        title: 'Preferences',
        description: 'Account Preferences',
        path: '/account/preferences',
        isEnabled: false,
        icon: ListIcon,
        shouldDisplay: loggedInUser,
      },
      {
        key: 'router-billing',
        title: 'Billing',
        description: 'Account Billing',
        path: '/account/billing',
        isEnabled: false,
        icon: BillingIcon,
        shouldDisplay: loggedInUser,
      },
    ],
  },
  {
    key: 'login',
    title: 'Login',
    description: 'Login',
    path: '/login',
    isEnabled: true,
    icon: LoginIcon,
    component: Login,
    shouldDisplay: unLoggedInUser
  },
  {
    key: 'sign-up',
    title: 'Sign up',
    description: 'Sign up',
    path: '/sign-up',
    isEnabled: true,
    icon: PersonAddIcon,
    component: SignUp,
    shouldDisplay: unLoggedInUser
  },
  {
    key: 'task',
    title: 'Task',
    description: 'Task page',
    path: '/tasks/:id',
    isEnabled: true,
    icon: TaskIcon,
    component: Task,
    shouldDisplay: () => false
  },
];

export default routes;
