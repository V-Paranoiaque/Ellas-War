import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-home.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminHomeComponent implements OnInit {
  
  constructor(public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
  }
}
