import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, of } from 'rxjs';
import { IReporte } from './Reporte'


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportesUrl = "http://localhost:8080/reportes";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }
  public getReportes(){
    return this.http.get<IReporte[]>(this.reportesUrl)
    .pipe(
      tap(_ => console.log('extrayendo catalogos')),
      catchError(this.handleError<IReporte[]>('loadReporte',[]))
    );
  }

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  agregarReporte(Reporte: IReporte): Observable<IReporte>{
    return this.http.post<IReporte>(this.reportesUrl, Reporte, this.httpOptions)
    .pipe(
      tap((newReporte: IReporte) => console.log(`added Reporte w/ id=${newReporte.id}`)),
      catchError(this.handleError<IReporte>('addReporte'))
    );
  }
}
