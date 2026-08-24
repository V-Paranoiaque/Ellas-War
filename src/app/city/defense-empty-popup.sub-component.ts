import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-defense-empty-popup',
  templateUrl: './defense-empty-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class DefenseEmptyPopupSubComponent {
  translate = inject(TranslateService);
}
