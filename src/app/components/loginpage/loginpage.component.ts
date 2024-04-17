import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { sharedService } from '../../services/sharedservice.service';

import { Inject } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  // constructor(private sharedService: sharedService, private router: Router, private _snackBar: MatSnackBar) { }


  // openSnackBar(message: string, action: string) {
  // }

  // email = '';
  // password = '';
  // ngOnInit(): void {

  // }
  // login() {
  //   if (this.email != "" || this.password != '') {
  //     var model: loginVm = {
  //       UserName: this.email,
  //       Password: this.password
  //     }

  //     this.sharedService.login(model)
  //       .subscribe(
  //         result => {
  //           if(!!result){
  //             localStorage.setItem('token', result.token);
  //             this.sharedService.currentUserData = result.userDetails;
  //             localStorage.setItem('currentuserData', JSON.stringify(result.userDetails));
  //             this.router.navigateByUrl('/homepage');
  //           }
            
  //         },
  //         error => {
  //           this._snackBar.open('Incorrect email/password', 'Dismiss', {
  //             duration: 2000,
  //           });
  //         },
  //         () => {
  //           // No errors, route to new page
  //         }
  //       );
  //   }
  //   else {
  //     this._snackBar.open('Enter credentials', 'Dismiss', {
  //       duration: 2000,
  //     });
  //     // this._snackBar.open("Enter credentials");
  //   }
  // }

  title = 'SLA Ticket Management System';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private _snackBar: MatSnackBar,
    private router: Router,
    private sharedService: sharedService,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe({
          next: (result) => {
            console.log(result);
            this.setLoginDisplay();
          },
          error: (error) => console.log(error),
        });
    } else {
      this.authService.loginPopup().subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();
        },
        error: (error) => console.log(error),
      });
    }
  }

  logout() {
    // Add log out function here
    this.authService.logoutPopup({
      mainWindowRedirectUri: '/',
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    if (this.loginDisplay) {
      // var userDetails = {
      //   isAdmin: true,
      // };
      // localStorage.setItem('currentuserData', JSON.stringify(userDetails));

      var user = this.authService.instance.getAllAccounts()[0];
      var newUser = {
        firstName: user.name,
        lastName: user.name,
        address: '123 KS USA',
        city: 'USA',
        phone: '9874584554',
        email: user.username,
        pswrd: '123456',
        isAdmin: true,
      };
      this.sharedService.addSLAUser(newUser).subscribe((res) => {
        console.log(res);
        res["isAdmin"]=res.admin;
        //this._snackBar.open("user added");
        localStorage.setItem('currentuserData', JSON.stringify(res));
        this.router.navigateByUrl('/homepage');
        // setTimeout((x) => {
        //   this.router.navigateByUrl('/homepage');
        // }, 1500);
      });
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
