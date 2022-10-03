import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

@Component({
  templateUrl: '../html/admin-stats-buildings.component.html'
})

export class AdminStatsBuildingsComponent {
  
  Tools = Tools;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
}
