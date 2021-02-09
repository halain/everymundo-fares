import { Pipe, PipeTransform } from '@angular/core';
import { Market } from '../models/market.model';

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {

  transform(value: number, data: Market): any {
    
    if(data.name.toLowerCase().includes('united states')){
      if (data.code==="USD"){
        return `${data.symbol} ${value}`
      }
    }

    if(data.name.toLowerCase().includes('argentina')){
      if (data.code==="USD"){
        return `${data.code} ${Math.trunc(value)}`
      }
    }

    if(data.name.toLowerCase().includes('spain')){
      if (data.code==="EUR"){
        return `${this.number_format(value,0,0,',')} ${data.symbol}`
      }
    }

    if(data.name.toLowerCase().includes('germany')){
      if (data.code==="EUR"){
        return `${data.symbol} ${this.number_format(value,0,0,'.')} `
      }
    }
    
    return `${data.symbol} ${value}`;
  }


  number_format (number, decimals, dec_point, thousands_sep) {
    let n = !isFinite(+number) ? 0 : +number, 
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    toFixedFix = function (n, prec) {
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        let k = Math.pow(10, prec);
        return Math.round(n * k) / k;
    },
      s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
      if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
      }
    return s.join(dec);
  }

}


