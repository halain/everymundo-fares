import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../services/travel.service';
import { Market } from 'src/app/models/market.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-setup-currency',
  templateUrl: './setup-currency.component.html',
  styleUrls: ['./setup-currency.component.scss']
})
export class SetupCurrencyComponent implements OnInit {

  markets: Market[] = [];
  
  sortAsc: boolean = true;


  constructor(private _travelServices: TravelService) { }

  ngOnInit(): void {
    this.getMarkets();
  }

  getSortIcon(){
    return (this.sortAsc) ? 'fa fa-sort-asc me-1' : 'fa fa-sort-desc me-1'
  }

  order(event: any){
    console.log(event);
    
  }

  deleteMarket(market: Market){     
      Swal.fire({
        title: 'Are you sure?',
        text: "Delete this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._travelServices.deleteNarket(market);
          Swal.fire(
            'Deleted!',
            'Resources has been deleted.',
            'success'
          ).finally( ()=>{
            this.getMarkets();
          })
        }
      })   
  }

  getMarkets(){
    this.markets = this._travelServices.getMarkets();
  }

}
