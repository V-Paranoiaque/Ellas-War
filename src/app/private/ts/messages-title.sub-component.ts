import { Component, Input } from '@angular/core';

@Component({
  selector: 'messages-title',
  templateUrl: '../html/messages-title.sub-component.html'
})

export class MessagesTitle {
  @Input()
  msg: any;
}
