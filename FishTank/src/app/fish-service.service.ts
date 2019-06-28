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

  /**
   * Handles errors.
   * 
   * @param operation the name of the operation in which an error occurred.
   * @param result the value that is erroreous.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * Get all fishes from the db.
   */
  getAllFishes(): Observable<Fish[]> {
    return this.http.get<any>('http://localhost:8080/fish').pipe(
      catchError(this.handleError<Fish[]>(`getAllFishes`))
    );
  }

  /**
   * Get the fish with id from the db.
   * 
   * @param id The id of the fish that is queried.
   */
  getFishById(id): Observable<Fish> {
    return this.http.get<any>('http://localhost:8080/fish/' + id).pipe(
      catchError(this.handleError<Fish>(`getFishByid`))
    );
  }

  /**
   * Increase the likes of a fish with id.
   * 
   * @param id the id of the fish whose likes are increased
   */
  increaseLikes(id): Observable<Fish> {
    return this.http.get<any>('http://localhost:8080/increaseLikes/' + id).pipe(
      catchError(this.handleError<Fish>(`increaseLikes`))
    );
  }

  /**
   * Saves or Updates a fish in the db.
   * 
   * @param fish the fish that will be saved/updated
   */
  saveFish(fish: Fish): Observable<Fish> {
    return this.http.post<any>('http://localhost:8080/newFish', fish).pipe(
      catchError(this.handleError<Fish>(`saveFish`))
    );
  }
}
