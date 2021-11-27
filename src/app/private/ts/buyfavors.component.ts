import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { IPayPalConfig, ICreateOrderRequest, NgxPaypalComponent } from 'ngx-paypal';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/buyfavors.component.html'
})

export class BuyFavorsComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public favorList: any[];
  public error:number=0;
  
  @ViewChild('payPalElem1') paypalComponent1?:  NgxPaypalComponent;
  @ViewChild('payPalElem5') paypalComponent5?:  NgxPaypalComponent;
  
  environment = environment;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.favorList = [
      {'item': 'A single Favor', price: 2},
      {'item': 'Pack of 5 Favors', price: 7.5, default: 1},
      {'item': 'Pack of 10 Favors', price: 13},
      {'item': 'Pack of 20 Favors', price: 24},
      {'item': 'Pack of 50 Favors', price: 55},
      {'item': 'Pack of 100 Favors', price: 100}
    ]
  }
  
  ngOnInit() {
    this.user.checkPermissions([1,3,4]);
    let c = 0;
    for(let i of this.favorList) {
      if(i.default) {
        this.onChange({'value': c});
        break;
      }
      c++;
    }
  }
  
  onChange(select:any) {
    this.translate.get(this.favorList[select.value].item).subscribe((res: string) => {
        this.initPaypal(
          res,
          this.favorList[select.value].price
        )
    });
  }
  
  initPaypal(text:string, price:number): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AVVRXtQZXoKoUmkpN6rHEqrMEtgawwjTRin4irS8DDd53r2LOHjiXjeyig8gxHuPg0Zk504pzUeW4jOl',
      createOrderOnClient: () => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: "favors",
            amount: {
              currency_code: environment.paypal.currency,
              value: price+'',
              breakdown: {
                item_total: {
                  currency_code: environment.paypal.currency,
                  value: price+'',
                }
              }
            },
            items: [
              {
                name: text,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: environment.paypal.currency,
                  value: price+'',
                },
              }
            ]
          }
        ]
      },
      advanced: { commit: 'true', extraQueryParams: [ { name: "disable-funding", value:"credit,card"} ] } ,
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (_data, _actions) => {
        this.error = 2;
      },
      onClientAuthorization: (data) => {
        this.error = 3;
        this.socket.emit('paypalBuy', data);
      },
      onError: (_err) => {
        this.error = 1;
      }
    };
  }
}
