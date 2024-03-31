import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'user/:id',
        loadComponent: () => import('./components/user-details/user-details.component').then(m => m.UserDetailsComponent)
    }
];
