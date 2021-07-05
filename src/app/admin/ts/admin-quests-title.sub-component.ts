import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-quests-title',
  templateUrl: '../html/admin-quests-title.sub-component.html'
})

export class AdminQuestsTitle {
  @Input() quest:any;
}
