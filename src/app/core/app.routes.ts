import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', loadComponent: () => import('../ui/main/app').then(c => c.App) },
    { path: 'loader', loadComponent: () => import('../ui/access/loader/loader').then(c => c.Loader) },
    { path: 'intro', loadComponent: () => import('../ui/access/intro/intro').then(c => c.Intro) },
    { path: 'buscador', loadComponent: () => import('../ui/access/intro-buscador/intro-buscador').then(c => c.IntroBuscador) },
    { path: 'provincias', loadComponent: () => import('../ui/access/provincias-list/provincias-list').then(c => c.ProvinciasList) },
    { path: 'autoescuelas/:provincia', loadComponent: () => import('../ui/access/autoescuela-provincias-list/autoescuela-provincias-list').then(c => c.AutoescuelaProvinciasList) },
    { path: 'login', loadComponent: () => import('../ui/access/login/login').then(c => c.Login) },
    { path: 'enter', loadComponent: () => import('../ui/dashboard/enter-dashboard/enter-dashboard').then(c => c.EnterDashboard), canActivate: [authGuard] },
    {
        path: 'dashboard', loadComponent: () => import('../ui/dashboard/dashboard-container/dashboard-container').then(c => c.DashboardContainer), canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'predefinidos', pathMatch: 'full' },
            { path: 'predefinidos', loadComponent: () => import('../ui/dashboard/predefinidos/predefinidos-cursos/predefinidos-cursos').then(c => c.PredefinidosCursos) },
            {
                path: 'predefinidos-categorias/:indexColor/:cdicurso/:cdipermiso',
                loadComponent: () => import('../ui/dashboard/predefinidos/predefinidos-test/predefinidos-test').then(c => c.PredefinidosTest)
            },
            { path: 'aleatorios', loadComponent: () => import('../ui/dashboard/aleatorios/aleatorios-cursos/aleatorios-cursos').then(c => c.AleatoriosCursos) },
            {
                path: 'aleatorios-test/:indexColor/:cdicurso/:cdipermiso',
                loadComponent: () => import('../ui/dashboard/aleatorios/aleatorios-test/aleatorios-test').then(c => c.AleatoriosTest)
            },
            { path: 'estadisticas', loadComponent: () => import('../ui/dashboard/estadisticas/estadisticas/estadisticas').then(c => c.Estadisticas) },
            { path: 'profeweb', loadComponent: () => import('../ui/dashboard/profe/profeweb-cursos/profeweb-cursos').then(c => c.ProfewebCursos) },
            {
                path: 'profeweb-categorias/:indexCurso/:index/:profewebcdi/:profewebid/:profecdi',
                loadComponent: () => import('../ui/dashboard/profe/profeweb-categorias/profeweb-categorias').then(c => c.ProfewebCategorias)
            },
            { path: 'profeweb-lista-reproducciones/:data', loadComponent: () => import('../ui/dashboard/profe/profeweb-lista-reproducciones/profeweb-lista-reproducciones').then(c => c.ProfewebListaReproducciones) },
        ]
    },
    { path: 'test/:tipo', loadComponent: () => import('../ui/test/test-container/test-container').then(c => c.TestContainer), canActivate: [authGuard] },
    { path: 'error', loadComponent: () => import('../ui/shared/server-error/server-error').then(c => c.ServerError) },
    { path: 'concurrencia/:mensaje', loadComponent: () => import('../ui/shared/concurrence-error/concurrence-error').then(c => c.ConcurrenceError) },
    { path: '**', redirectTo: 'inicio' }
];
