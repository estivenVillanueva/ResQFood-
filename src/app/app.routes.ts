import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'ofertas',
    loadComponent: () =>
      import('./features/user/user-offers.component').then(
        (m) => m.UserOffersComponent
      ),
  },
  {
    path: 'negocios',
    loadComponent: () =>
      import('./features/business/business-dashboard.component').then(
        (m) => m.BusinessDashboardComponent
      ),
  },
  { path: '**', redirectTo: '' },
];

