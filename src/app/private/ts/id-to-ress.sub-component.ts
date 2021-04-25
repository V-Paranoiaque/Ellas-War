import { Component, Input } from '@angular/core';

@Component({
  selector: 'id-to-ress',
  templateUrl: '../html/id-to-ress.sub-component.html',
  styleUrls: ['../css/id-to-ress.sub-component.css']
})

export class IdToRess {
  @Input()
  ress_id: any;
}
