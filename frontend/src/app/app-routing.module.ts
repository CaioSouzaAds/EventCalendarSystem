import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard], // Guarda aplicado aqui, nas rotas principais
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'events',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'details/:id', component: EventDetailsComponent },
          { path: 'list', component: EventListComponent },
          { path: 'details', component: EventDetailsComponent },
        ],
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  // Rotas sem guarda (públicas)
  {
    path: 'user',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona /user para /user/login
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  // Redirecionamento para dashboard como fallback
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
