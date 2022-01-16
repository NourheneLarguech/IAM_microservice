import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post(environment.apiUrl + '/api/register/', data);
  }
  login(data: any) {
    return this.http.post(environment.apiUrl + '/api/login/', data);
  }

  getUsers() {
    return this.http.get('http://127.0.0.1:8000/api/users');
  }
  getRoles() {
    return this.http.get('http://127.0.0.1:8000/api/roles');
  }
  getPermissions() {
    return this.http.get('http://127.0.0.1:8000/api/permissions');
  }
  insertUser(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/users/', data);
  }
  deleteUser(id: any) {
    return this.http.delete('http://127.0.0.1:8000/api/users/' + id);
  }

  updateUser(id: any, data: any) {
    return this.http.put('http://127.0.0.1:8000/api/users/' + id, data);
  }
  getUserById(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/users/' + id);
  }
  insertPermission(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/permissions', data);
  }
  updatePermission(id: any, data: any) {
    return this.http.put('http://127.0.0.1:8000/api/permissions/' + id, data);
  }
  deletePermission(id: any) {
    return this.http.delete('http://127.0.0.1:8000/api/permissions/' + id);
  }
  insertRole(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/roles', data);
  }
  updateRole(id: any, data: any) {
    return this.http.put('http://127.0.0.1:8000/api/roles/' + id, data);
  }
  deleteRole(id: any) {
    return this.http.delete('http://127.0.0.1:8000/api/roles/' + id);
  }
  getPermissionById(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/permissions/' + id);
  }
  getRoleById(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/roles/' + id);
  }
  isAdmin(id: any) {
    return this.http
      .get('http://127.0.0.1:8000/api/user/' + id);
        
      }
  
}
