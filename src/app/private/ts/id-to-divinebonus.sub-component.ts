import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'id-to-divinebonus',
  templateUrl: '../html/id-to-divinebonus.sub-component.html'
})

export class IdToDivineBonus {
  @Input()
  id: any;
  
  constructor(public translate: TranslateService) {}
  
}
