import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles:any;
  role=new Role();
  permissionsList : any;
  selectedItems = [];
  dropdownSettings: IDropdownSettings={};
  id:any;
  action:any;

  constructor(private dataService:DataService,private route:ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getData();
    this.id=this.route.snapshot.params['id'];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
     // itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    
     
    
    
    
   
    
    
  }

  open(modal:any,action:any,role:any) {
    this.action=action;
    this.role=role;
    this.dataService.getPermissions().subscribe(res=>{
      console.log(res);
      var arr:any=res;
      this.permissionsList=arr.map(function(elm: { name: any; }) {return elm.name;});
      console.log("list perm",this.permissionsList);
      
    });
    if(action==="Update"){
    console.log("update ",this.role.permissions);
    this.selectedItems = this.role.permissions.map(function(elm: {name: any; }) { return elm.name;});
    this.role.permissions=this.selectedItems;
  console.log("selected",this.selectedItems) }
    
   
    this.modalService.open(modal);
    console.log(this.role);
    
  } 
  onItemSelect($event: any){
    console.log('$event is ', $event); 
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }
  getData(): void {
    this.dataService.getRoles().subscribe(res =>{
      this.roles=res;
    });
  
  }
  

  insertData(modal:any){
    console.log("added role",this.role);
    
    this.dataService.insertRole(this.role).subscribe(res=>{
     
      modal.close();
      this.getData();
      
    });
    this.ngOnInit();

    
    
   
    
  }

    deleteData(id:any){
      console.log(this.id);
      this.dataService.deleteRole(id).subscribe(res=>{
        
        this.getData();
       
  
      })}
     
  
    
       permissions(id:any){
         
       }
     
     getDataById(id:any){
      this.dataService.getRoleById(id).subscribe(res=>{
       this.role=res as Role;
       
      })
     }
     updateData(modal:any){
       console.log("updated role",this.role);
       
       this.dataService.updateRole(this.role.id,this.role).subscribe(res=>{
       
        modal.close();
        this.getData();
        
       });
       
      
       this.ngOnInit();
     }

}
