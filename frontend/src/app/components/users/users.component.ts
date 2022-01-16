import { LoginComponent } from './../../login/login.component';
import { AuthGuard } from './../../auth.guard';

import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  user = new User();
  rolesList: any;
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  id: any;
  action: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  
   
  
  ) {
   
  }

  ngOnInit(): void {
    this.getData();
    this.id = this.route.snapshot.params['id'];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  getUserRoles(user: any) {
    return user.roles.map(function (elm: { name: any }) {
      return elm.name;
    });
  }
  open(modal: any, action: any, user: any) {
    this.action = action;
    this.user = user;
    this.dataService.getRoles().subscribe((res) => {
      console.log(res);
      var arr: any = res;
      this.rolesList = arr.map(function (elm: { name: any }) {
        return elm.name;
      });
      console.log('list perm', this.rolesList);
    });
    if (action === 'Update') {
      console.log('update ', this.user.roles);
      this.selectedItems = this.getUserRoles(this.user);
      this.user.roles = this.selectedItems;
      console.log('selected', this.selectedItems);
    }

    this.modalService.open(modal);
    console.log(this.user);
  }
  onItemSelect($event: any) {
    console.log('$event is ', $event);
  }

  onSelectAll(items: any) {
    console.log(items);
  }
  getData(): void {
    this.dataService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  insertData(modal: any) {
    console.log('added user', this.user);

    this.dataService.insertUser(this.user).subscribe((res) => {
      modal.close();
      this.getData();
    });
    this.ngOnInit();
  }

  deleteData(id: any) {
    console.log(this.id);
    this.dataService.deleteUser(id).subscribe((res) => {
      this.getData();
    });
  }

  getDataById(id: any) {
    this.dataService.getUserById(id).subscribe((res) => {
      this.user = res as User;
    });
  }
  updateData(modal: any) {
    console.log('updated user', this.user);

    this.dataService.updateUser(this.user.id, this.user).subscribe((res) => {
      modal.close();
      this.getData();
    });

    this.ngOnInit();
  }
}
