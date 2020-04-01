import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: PostListComponent, canActivate:  [AuthGuard]},
  { path: 'create', component: PostCreateComponent, canActivate:  [AuthGuard]},
  { path: 'edit/:postId', component: PostCreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
