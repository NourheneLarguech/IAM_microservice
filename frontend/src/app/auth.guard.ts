import { DataService } from './service/data.service';
import { Injectable } from "@angular/core";
import {  CanActivate, Router} from "@angular/router";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private router:Router, private dataService:DataService){

    }
    token:any;
    
    canActivate() {
        this.token=localStorage.getItem('token'); 
        if(this.token){
            return true;
        }else{
           return this.router.navigate(['login']);
           
        }
    }
    isAdmin(){
    
        let currentUser:any=jwt_decode(this.token);
        let userData:any;
        this.dataService.getUserById(currentUser.user_id).subscribe(res=>{
           userData=res ;
           console.log(res);
          
         });
         
         let roles:any=userData.roles.map(function(elm: {name: any; }) { return elm.name;});
          return (roles.includes('administrator'));
          
      }
}