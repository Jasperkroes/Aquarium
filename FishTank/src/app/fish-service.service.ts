import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fish } from './Fish';

@Injectable({
  providedIn: 'root'
})
export class FishServiceService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getAllFishes(): Observable<Fish[]> {
    return this.http.get<any>('http://localhost:8080/fish').pipe(
      catchError(this.handleError<Fish[]>(`getAllFishes`))
    );
  }

  getFishById(id): Observable<Fish> {
    return this.http.get<any>('http://localhost:8080/fish/' + id).pipe(
      catchError(this.handleError<Fish>(`getFishByid`))
    );
  }
}
