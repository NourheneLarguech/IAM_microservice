import { Permission } from './../../permission';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';

import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  permissions :any;
  permission = new Permission();
  id:any;
  action:any;
   
  
 

 
  
  constructor(private dataService:DataService,private route:ActivatedRoute,private modalService: NgbModal) { }
  
  
  open(modal:any,action:any,permission:any) {
    console.log(this.permission);
    this.action=action;
    this.permission=permission;
    this.modalService.open(modal);
    
  } 
  
  

  ngOnInit(): void {
    this.getData();
    this.id=this.route.snapshot.params['id'];
    
    
  }
  
  getData(): void {
    this.dataService.getPermissions().subscribe(res =>{
      this.permissions=res;
    });
  
  }

  insertData(modal:any){
    console.log(this.permission);
    
    this.dataService.insertPermission(this.permission).subscribe(res=>{
     
      modal.close();
      this.getData();
      
    });
    this.ngOnInit();

    
    
   
    
  }

    deleteData(id:any){
      console.log(this.id);
      this.dataService.deletePermission(id).subscribe(res=>{
        
        this.getData();
       
  
      })}
     
  
    
       
     
     getDataById(id:any){
      this.dataService.getPermissionById(id).subscribe(res=>{
       this.permissions=res;
       
      })
     }
     updateData(modal:any){
       console.log(this.permission);
       this.dataService.updatePermission(this.permission.id,this.permission).subscribe(res=>{
       
        modal.close();
        this.getData();
       });
       
      
       this.ngOnInit();
     }
       
       
  

}
