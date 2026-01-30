import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', loadComponent: () => import('../ui/main/app').then(m => m.App)},
    { path: 'loader', loadComponent: () => import('../ui/access/loader/loader').then(m => m.Loader) },
    { path: 'intro', loadComponent: () => import('../ui/access/intro/intro').then(m => m.Intro) },
    { path: 'login', loadComponent: () => import('../ui/access/login/login').then(m => m.Login) },
    { path: '**', redirectTo: 'inicio' }
];
