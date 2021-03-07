import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'success-card',
  templateUrl: '../html/success-card.sub-component.html',
  styleUrls: ['../css/success-card.sub-component.css']
})

export class SuccessCard {
  @Input()
  title:string;
  @Input()
  text:string;
  @Input()
  currently:any;
  @Input()
  point:string;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.title = '';
    this.text = '';
    this.currently = false;
    this.point = '0';
  }
}
