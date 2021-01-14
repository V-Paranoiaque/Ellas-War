import { Component, Input } from '@angular/core';

@Component({
  selector: 'id-to-ress',
  templateUrl: '../html/id-to-ress.sub-component.html'
})

export class IdToRess {
  @Input()
  ress_id: any;
}
