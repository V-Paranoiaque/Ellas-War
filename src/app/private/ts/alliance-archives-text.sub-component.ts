import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-archives-text',
  templateUrl: '../html/alliance-archives-text.sub-component.html'
})

export class AllianceArchivesText {
  @Input() msg:any;
  
  constructor(public translate: TranslateService, public user: User) {}
}
