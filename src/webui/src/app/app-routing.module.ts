import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from "./project/project.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AppLayoutComponent } from "./_layout/app-layout/app-layout.component";
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { IssueComponent } from './issue/issue.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { AuthGuard } from './security/aut.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: ''},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'project', component:ProjectComponent},
      {path: 'issue', component: IssueComponent},
      {path: 'issue/issue-detail/:id', component: IssueDetailComponent},

      
    ]
  },
    // {path: '**', component: NotfoundComponent},
     {path: 'login', component: LoginComponent},
     {path: 'register', component: RegisterComponent},


    
  
  
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
