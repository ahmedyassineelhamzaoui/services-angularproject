import { Injectable,NgZone } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './shared/token.service';
import { Role } from './role';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Permission } from './permission';
@Injectable({
  providedIn: 'root'
})
export class RoleService {


  httpHeaders = new HttpHeaders().set('content-type','application/json');
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http:HttpClient,
    public router:Router,
    public ngZone:NgZone,
    public token: TokenService,
  ) { }


  getAllRoles(page: number): Observable<any>{
     return this.http.get<any>(this.apiUrl + '/roles?page='+page).pipe(catchError(this.handlError));
  }
  addRole(role : Role):Observable<any>{
  return this.http.post<any>(this.apiUrl+'/createrole',role).pipe(catchError(this.handlError));
  }
  removeRole(index:number): Observable<any>{
    return this.http.delete<any>(this.apiUrl + `/deleterole?id=${index}`).pipe(catchError(this.handlError));
  }
  handlError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Èrror Code : ${error.status}\n Message: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
