import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { StarshipsComponent } from './starships/starships.component';
import { PlanetsComponent } from './planets/planets.component';
import { CharactersComponent } from './characters/characters.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'planets', component: PlanetsComponent, canActivate: [AuthGuard] },
  { 
    path: 'characters', 
    component: CharactersComponent, 
    canActivate: [RoleGuard],
    data: { role: 'Reader' }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
