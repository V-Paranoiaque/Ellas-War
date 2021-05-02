import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-prayers.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminPrayers {
  
  constructor(public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
  }
}
  