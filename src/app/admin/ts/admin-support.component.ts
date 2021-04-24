import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-support.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminSupport {
  
  constructor(public user: User, public translate: TranslateService) {
  }
}
  