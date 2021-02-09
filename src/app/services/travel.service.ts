import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';
import { Market } from '../models/market.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  markets: Market[] = [];
  
  private BASE_URL = `https://restcountries.eu/rest/v2`;

  get httpParams(){
    return  new HttpParams().set('fields', 'name;numericCode;flag');
  }

  constructor(private http: HttpClient) {
    this.loadStorage();
   }


  getCountry(name: string): Observable<Country[]>{
    const url = `${this.BASE_URL}/name/${name}`;
    return this.http.get<Country[]>(url,{params: this.httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }


  getMarkets() {
    return this.markets;
  }

  getMarketById(id: string){
    return this.markets.find(market=> market.id===id) ;
  }


  deleteNarket(market: Market){
    this.markets = this.markets.filter( marketData =>  marketData.id !== market.id)
    this.saveStorage();
}


  createMarket(market: Market){
    this.markets.push( market );
    this.saveStorage();
  }

  editMarket(market: Market){
    this.markets = this.markets.filter( marketData =>  marketData.id !== market.id)
    this.markets.push(market);
    this.saveStorage();
  }



  loadStorage(){  
    if (localStorage.getItem('travel')) {
        this.markets = JSON.parse( localStorage.getItem('travel') );
    } else {
        this.markets = [];
    }
}


saveStorage(){
  localStorage.setItem('travel', JSON.stringify( this.markets )); 
}



private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return of([]);
}



}











