import { Component, Input } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-archives-title',
  templateUrl: '../html/alliance-archives-title.sub-component.html'
})

export class AllianceArchivesTitle {
  @Input() type:any;
  @Input() title:any;
  
  constructor(public user: User) {}
}
