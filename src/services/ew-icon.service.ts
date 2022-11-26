import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ewIcons } from '../environments/ew-icons';

@Component({
  selector: 'app-ew-icon',
  template: `
    <ng-content></ng-content>
  `,
  styles: [':host::ng-deep svg{width: 100%; height: inherit; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EwIconSubComponent {
  @Input()
  
  set name(iconName:string) {
    this.element.nativeElement.innerHTML = ewIcons[iconName] || ewIcons['default'];
  }
  
  constructor(private element: ElementRef) {
    
  }
  
  static getDivineBonus(id:number) {
    switch(id) {
      case 1: return 'iron';
      case 2: return 'wood';
      case 3: return 'grapes';
      case 4: return 'stone';
      case 5: return 'marble';
      case 6: return 'wine';
      case 7: return 'gold';
      case 8: return 'favor';
      case 9: return 'spartan';
      case 10: return 'menu-temple';
      case 11: return 'treasure';
      case 12: return 'menu-agora';
      case 13: return 'smenu-attacks';
      case 14: return 'drachma';

      case 24: return 'basket-iron';
      case 25: return 'basket-silver';
      case 26: return 'basket-gold';
    }
    return 'default'
  }
}
