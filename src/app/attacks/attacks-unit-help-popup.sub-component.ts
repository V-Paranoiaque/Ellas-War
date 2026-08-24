import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-unit-help-popup',
  templateUrl: './attacks-unit-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class AttacksUnitHelpPopupSubComponent {
  translate = inject(TranslateService);
}
