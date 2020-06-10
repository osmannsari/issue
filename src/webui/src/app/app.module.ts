import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutComponent } from "./_layout/app-layout/app-layout.component";
import { FooterComponent } from "./_layout/footer/footer.component";
import { HeaderComponent } from "./_layout/header/header.component";
import { SidebarComponent } from "./_layout/sidebar/sidebar.component";
import { BsDropdownModule, CollapseModule, ModalModule, PaginationModule } from "ngx-bootstrap";
import { ToastNoAnimation, ToastNoAnimationModule, ToastrModule } from "ngx-toastr";
import { ApiService } from "./services/api.service";
import { ProjectService } from "./services/shared/project.service";
import { UserService } from "./services/shared/user.service";
import { IssueService } from "./services/shared/issue.service";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from './shared/shared.module';
import { IssueHistoryService } from './services/shared/issue.history.service';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { IssueComponent } from './issue/issue.component';
import { ProjectComponent } from './project/project.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { AuthenticationService } from './security/authentication.service';
import { AuthGuard } from './security/aut.guard';
import { ErrorInterceptor } from './security/authentication.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    NotfoundComponent,
    IssueComponent,
    ProjectComponent,
    IssueDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
      maxOpened: 1,
      autoDismiss: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    ApiService,
    ProjectService, 
    IssueService, 
    UserService, 
    IssueHistoryService,
    AuthenticationService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},


  ],
 
  bootstrap: [AppComponent]
})
export class AppModule {
}
