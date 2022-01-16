import { DataService } from './../service/data.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  token: any;
  currentUser: any;

  email: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.currentUser = jwt_decode(this.token);
    this.email = this.currentUser.email;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
