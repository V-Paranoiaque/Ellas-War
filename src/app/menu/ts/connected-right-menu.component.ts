import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'connected-right-menu',
  templateUrl: '../html/connected-right-menu.component.html',
  styleUrls: ['../css/connected-right-menu.component.css']
})

export class ConnectedRightMenu {
  constructor(public user: User, public translate: TranslateService) {
    
  }
  
}
