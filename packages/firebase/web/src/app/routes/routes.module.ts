import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, AngularFireAuthGuardModule, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LayoutComponent } from './layout/layout.component';


const redirToLogin = canActivate(() => redirectUnauthorizedTo(['/secured/login']));
const redirToHome = canActivate(() => redirectLoggedInTo(['/']));

const routes: Routes = [

  { path: 'secured', ...redirToHome, loadChildren: () => import('./secured/secured.module').then(mod => mod.SecuredModule) },
  {
    path: '',
    ...redirToLogin,
    component: LayoutComponent,
    children: [
      { path: 'groups', loadChildren: () => import('./groups/groups.module').then(mod => mod.GroupsModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule) },
      { path: '', pathMatch:  'full', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) },
    ],
  },
];


@NgModule({
  providers: [
    AngularFireAuthGuard
  ],
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class RoutesModule { }
