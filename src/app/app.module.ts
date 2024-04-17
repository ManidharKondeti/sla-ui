import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // Import
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { MatTabsModule } from '@angular/material/tabs';
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
} from "@azure/msal-angular"; // Import MsalInterceptor
import {
  InteractionType,
  PublicClientApplication,
} from "@azure/msal-browser";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AuthordialogComponent } from './components/authordialog/authordialog.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategorydialogComponent } from './components/categorydialog/categorydialog.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { IssuedbooksComponent } from './components/issuedbooks/issuedbooks.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { NavigationbarComponent } from './components/navigationbar/navigationbar.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from "./profile/profile.component";
import { sharedService } from './services/sharedservice.service';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [ HomeComponent, ProfileComponent,
    AppComponent,
    LoginpageComponent,
    HomepageComponent,
    NavigationbarComponent,
    AdduserComponent,
    BooksComponent,
    AuthorsComponent,
    UsersComponent,
    CategoriesComponent,
    IssuedbooksComponent,
    AddbookComponent,
    AuthordialogComponent,
    CategorydialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,MatTableModule,MatMenuModule,MatDialogModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: "17b68e0d-04e3-47d9-9a0d-cf8c83203e59",
          authority:
            "https://login.microsoftonline.com/08d2293e-cece-4727-890b-cab1fadeed57",
          redirectUri: "https://slaui-main.azurewebsites.net/",
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ["user.read"],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/ v1.0/me", ["user.read"]],
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
    sharedService
  ],

  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}