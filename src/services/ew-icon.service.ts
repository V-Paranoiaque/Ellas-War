import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ewIcons } from '../environments/ew-icons';

@Component({
  selector: 'ew-icon',
  template: `
    <ng-content></ng-content>
  `,
  styles: [':host::ng-deep svg{width: 100%; height: inherit; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EwIcon {
  @Input()
  
  set name(iconName:string) {
    this.element.nativeElement.innerHTML = ewIcons[iconName] || null;
  }
  
  constructor(private element: ElementRef) {
    
  }
}
