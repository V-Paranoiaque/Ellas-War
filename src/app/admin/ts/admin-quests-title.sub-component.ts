import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'admin-quests-title',
  templateUrl: '../html/admin-quests-title.sub-component.html'
})

export class AdminQuestsTitle {
  @Input() quest:any;
  
  constructor(public translate: TranslateService) {
    
  }
}