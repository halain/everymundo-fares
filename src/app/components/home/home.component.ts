import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from '../../services/travel.service';
import { Market } from 'src/app/models/market.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(public _travel: TravelService, private router: Router) { }


  

  getMarket(id: string){
    this.router.navigate( ['/setup', id] );
  }

}
