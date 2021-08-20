import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messages-title',
  templateUrl: '../html/messages-title.sub-component.html'
})

export class MessagesTitleSubComponent {
  @Input()
  msg: any;
}
