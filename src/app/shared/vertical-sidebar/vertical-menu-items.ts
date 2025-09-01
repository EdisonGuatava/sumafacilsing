import { RouteInfo } from './vertical-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Personal',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: [],
  },
  {
    path: '/starter',
    title: 'Inicio',
    icon: 'home',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '',
    title: 'UI',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: [],
  },
  {
    path: '/perfil',
    title: 'Perfil',
    icon: 'home',
    class: '',
    extralink: false,
    submenu: [],
  },
  
];
