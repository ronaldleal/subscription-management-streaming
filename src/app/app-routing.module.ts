import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/components/login/login.component';
import { HomeComponent } from './presentation/components/home/home.component';
import { SubscriptionPlansComponent } from './presentation/components/subscription-plans/subscription-plans.component';
import { RegisterComponent } from './presentation/components/register/register.component'; // Corregido

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'plans', component: SubscriptionPlansComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}