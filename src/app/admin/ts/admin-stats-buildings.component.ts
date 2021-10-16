import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-stats-buildings.component.html'
})

export class AdminStatsBuildingsComponent {
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
}
