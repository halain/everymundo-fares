import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TravelService } from '../../../services/travel.service';
import { debounceTime, tap, switchMap, take } from 'rxjs/operators';
import { pipe, Subscription } from 'rxjs';
import { Country } from '../../../interfaces/pais.interface';
import { Market } from 'src/app/models/market.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  valueSubscription: Subscription;
  countrySelected: { flag: string; numericCode: string };
  showFiltered: boolean = false;
  filteredCountries: Country[] = [];
  isLoading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    symbol: ['', Validators.required],
    fare: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private _travelServices: TravelService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.valueSubscription = this.getField('name')
      .valueChanges.pipe(
        tap(() => {
          this.isLoading = true;
          this.showFiltered = true;
        }),
        debounceTime(500),
        switchMap((value: string) => this._travelServices.getCountry(value))
      )
      .subscribe(
        (country: Country[]) => {
          this.filteredCountries = country.splice(0, 5);
          this.isLoading = false;
          this.showFiltered = true;
        },
        (err) => {
          this.isLoading = false;
          this.showFiltered = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.valueSubscription?.unsubscribe();
  }

  fieldInValid(field: string) {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  getFieldValue(field: string) {
    return this.form.controls[field].value;
  }

  getField(field: string) {
    return this.form.controls[field];
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const market = new Market(
      this.getFieldValue('name'),
      this.getFieldValue('code'),
      this.getFieldValue('symbol'),
      this.getFieldValue('fare'),
      this.countrySelected.flag,
      this.countrySelected.numericCode
    );

    this._travelServices.createMarket(market);
    this.form.reset({ name: '' }, { emitEvent: false });
  }

  selectCountry(country: Country) {
    this.filteredCountries = [];
    this.countrySelected = country;
    this.showFiltered = false;
    this.isLoading = false;
    this.getField('name').setValue(country.name, { emitEvent: false });
  }
}
