import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    /* canActivate: [AuthGuard], */
    /* data: {} */
  },
  {
    path: 'profile-page/:id',
    loadChildren: () => import('./components/profile-page/profile-page.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'messages',
    loadChildren: () => import('./components/messages/messages.module').then(m => m.MessagesModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }