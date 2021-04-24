import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-pauses.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminPauses {
  
  constructor(public user: User, public translate: TranslateService) {
  }
}
  