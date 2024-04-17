import { Component, OnInit } from '@angular/core';
import{sharedService} from '../../services/sharedservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  constructor(private sharedService: sharedService,private router: Router) { }
  currentUser: any;
  isAdmin = false;
  fine=0;
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentuserData'));

    this.isAdmin = this.currentUser?.isAdmin;
    this.fine=this.currentUser.fine;
  }
  logout() {
    this.router.navigateByUrl('/');
    localStorage.clear();
   // location.reload();
  }
}
