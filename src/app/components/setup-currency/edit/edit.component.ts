import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { Country } from 'src/app/interfaces/pais.interface';
import { Market } from 'src/app/models/market.model';
import { TravelService } from '../../../services/travel.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  market: Market = null;
   
  form = this.fb.group({
    name: [{value: '', disabled: true}, [Validators.required]],
    code: ['', Validators.required],
    symbol: ['', Validators.required],
    fare: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(private activatedRoute: ActivatedRoute, private _travelServices: TravelService,  private fb: FormBuilder, private router: Router) { 

    this.activatedRoute.params.subscribe( ({id}) => { 
      this.market = this._travelServices.getMarketById(id);
    });

  }


  ngOnInit(): void {
    this.form.patchValue({
      name:this.market.name,
      code: this.market.code,
      symbol: this.market.symbol,
      fare: this.market.fare
    });
}


  fieldInValid(field: string){
    return this.form.controls[field].errors && 
            this.form.controls[field].touched;
  }

  getFieldValue(field: string){
    return this.form.controls[field].value;
  }

  getField(field: string){
    return this.form.controls[field];
  }


  save(){

    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    } 

    const market = new Market(this.getFieldValue('name'),
                              this.getFieldValue('code'),
                              this.getFieldValue('symbol'),
                              this.getFieldValue('fare'), 
                              this.market.flag, 
                              this.market.id);

    this._travelServices.editMarket(market);
        
    this.router.navigate(['/setup']);
    

  }



}
