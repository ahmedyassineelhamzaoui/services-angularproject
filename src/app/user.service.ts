import { Injectable,NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user';
import { TokenService } from './shared/token.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpHeaders = new HttpHeaders().set('content-type','application/json');

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
        private http: HttpClient,
        private router:Router,
        private ngZone: NgZone,
        private tokenService:TokenService) { }
    
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>( this.apiUrl+'/login', body).pipe(catchError(this.handlError));
  }
  getAllUsers():Observable<any> {
      return this.http.get<User[]>(this.apiUrl+'/users').pipe(catchError(this.handlError));
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
