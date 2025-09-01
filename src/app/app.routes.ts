import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegistroComponent } from './registro/registro.component';
import { RegistroemailComponent } from './registroemail/registroemail.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { SingcontracComponent } from './pages/singcontrac/singcontrac.component';
import { SingfirmadoComponent } from './pages/singfirmado/singfirmado.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'login', pathMatch: 'full' },

      // {
      //   path: 'starter',
      //   component: InicioComponent,
      //   // loadChildren: () =>
      //   //   import('./starter/starter.routes').then((m) => m.StarterRoutes),
      // },
      // {
      //   path: 'perfil',
      //   component: PerfilComponent,
      //   // loadChildren: () =>
      //   //   import('./starter/starter.routes').then((m) => m.StarterRoutes),
      // },
      // {
      //   path: 'solicitud',
      //   component: SolicitudComponent,
      //   // loadChildren: () =>
      //   //   import('./starter/starter.routes').then((m) => m.StarterRoutes),
      // },
      // {
      //   path: 'component',
      //   loadChildren: () =>
      //     import('./component/component.routes').then(
      //       (m) => m.ComponentsRoutes
      //     ),
      // },
    ],
  },
 
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'registro',
  //   component: RegistroComponent,
  // },
  // {
  //   path: 'registroemail',
  //   component: RegistroemailComponent,
  // },
  {
    path: 'singcontrac/:id',
    component: SingcontracComponent,
  },
  {
    path: 'singfirmado',
    component: SingfirmadoComponent,
  },
  {
    path: '**',
    redirectTo: 'singfirmado'
  },
];
