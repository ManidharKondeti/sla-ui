import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router, private _snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string) {
  }

  ngOnInit(): void {

  }
  

}
