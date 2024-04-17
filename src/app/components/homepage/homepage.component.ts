import { Component, OnInit } from '@angular/core';
import { sharedService } from '../../services/sharedservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  cardsData: any;
  currentUser;
  isAdmin = false;
  cardKeys = [];
  showCards = false;
  constructor(private sharedService: sharedService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentuserData'));
    this.isAdmin = this.currentUser.isAdmin;
    if (this.currentUser?.isAdmin) {
      this.sharedService.getslaDashBoardData().subscribe((x) => {
        this.cardsData = x;
        this.cardKeys = Object.keys(this.cardsData);
        console.log(this.cardKeys);
        this.showCards = true;
      });
    }
  }

  ngOnInit(): void {}
}
