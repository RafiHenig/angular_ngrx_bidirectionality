import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class XhrService {
  private readonly baseURl = 'api';
  private readonly paramsFactory = (x: { [key: string]: string }): { params: HttpParams } => ({ params: new HttpParams({ fromObject: x }) });

  constructor(private readonly http: HttpClient) { }

  public readonly logPost = (x: User): Observable<void> => this.http.post<void>(`${this.baseURl}/auth/login`, x);
  public readonly logGet = () : Observable<boolean> => this.http.get<boolean>(`${this.baseURl}/auth/logged`);
  public readonly logDelete = () : Observable<void> => this.http.delete<void>(`${this.baseURl}/auth/logout`);
  public readonly userGet = (): Observable<User> => this.http.get<User>(`${this.baseURl}/auth/user`);
  public readonly userPost = (x: User): Observable<void> => this.http.post<void>(`${this.baseURl}/user`, x);
  public readonly userPut = (id: any, x: User): Observable<void> => this.http.put<void>(`${this.baseURl}/user/${id}`, x);
  public readonly userDelete = (id: any): Observable<void> => this.http.get<void>(`${this.baseURl}/user/${id}`);
}
