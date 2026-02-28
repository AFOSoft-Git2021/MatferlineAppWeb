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
    { path: 'enter', loadComponent: () => import('../ui/dashboard/enter-dashboard/enter-dashboard').then(m => m.EnterDashboard), canActivate: [authGuard] },
    {
        path: 'dashboard', loadComponent: () => import('../ui/dashboard/dashboard-container/dashboard-container').then(m => m.DashboardContainer), canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'predefinidos', pathMatch: 'full' },
            { path: 'predefinidos', loadComponent: () => import('../ui/dashboard/predefinidos/predefinidos-cursos/predefinidos-cursos').then(m => m.PredefinidosCursos) },
            {
                path: 'predefinidos-categorias/:cdicurso/:cdipermiso',
                loadComponent: () => import('../ui/dashboard/predefinidos/predefinidos-test/predefinidos-test').then(m => m.PredefinidosTest)
            },
            { path: 'aleatorios', loadComponent: () => import('../ui/dashboard/aleatorios/aleatorios-cursos/aleatorios-cursos').then(m => m.AleatoriosCursos) },
            {
                path: 'aleatorios-test/:cdicurso/:cdipermiso',
                loadComponent: () => import('../ui/dashboard/aleatorios/aleatorios-test/aleatorios-test').then(m => m.AleatoriosTest)
            },
            { path: 'profeweb', loadComponent: () => import('../ui/dashboard/profe/profeweb-cursos/profeweb-cursos').then(m => m.ProfewebCursos) },
            {
                path: 'profeweb-categorias/:index/:profewebcdi/:profewebid/:profecdi',
                loadComponent: () => import('../ui/dashboard/profe/profeweb-categorias/profeweb-categorias').then(m => m.ProfewebCategorias)
            },
            { path: 'estadisticas', loadComponent: () => import('../ui/dashboard/estadisticas/estadisticas/estadisticas').then(m => m.Estadisticas) },
        ]
    },
    { path: 'error', loadComponent: () => import('../ui/shared/server-error/server-error').then(m => m.ServerError) },
    { path: 'concurrencia/:mensaje', loadComponent: () => import('../ui/shared/concurrence-error/concurrence-error').then(m => m.ConcurrenceError) },
    { path: '**', redirectTo: 'inicio' }
];
