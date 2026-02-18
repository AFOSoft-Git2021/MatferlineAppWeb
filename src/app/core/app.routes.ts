import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', loadComponent: () => import('../ui/main/app').then(m => m.App) },
    { path: 'loader', loadComponent: () => import('../ui/access/loader/loader').then(m => m.Loader) },
    { path: 'intro', loadComponent: () => import('../ui/access/intro/intro').then(m => m.Intro) },
    { path: 'buscador', loadComponent: () => import('../ui/access/intro-buscador/intro-buscador').then(m => m.IntroBuscador) },
    { path: 'provincias', loadComponent: () => import('../ui/access/provincias-list/provincias-list').then(m => m.ProvinciasList) },
    { path: 'autoescuelas/:provincia', loadComponent: () => import('../ui/access/autoescuela-provincias-list/autoescuela-provincias-list').then(m => m.AutoescuelaProvinciasList) },
    { path: 'login', loadComponent: () => import('../ui/access/login/login').then(m => m.Login) },
    { path: 'dashboard', loadComponent: () => import('../ui/dashboard/dashboard-container/dashboard-container').then(m => m.DashboardContainer), canActivate: [authGuard]},
    { path: '**', redirectTo: 'inicio' }
];
