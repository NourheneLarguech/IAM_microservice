import { Component, OnInit } from '@angular/core';
import { DataService } from './../service/data.service';


import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
})
export class HomeUserComponent implements OnInit {
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
