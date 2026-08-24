import { RouterModule } from '@angular/router';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { EwIconSubComponent } from '../../services/ew-icon.service';

@Component({
  selector: 'app-first-info-popup',
  templateUrl: './first-info-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    EwIconSubComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class FirstInfoPopupSubComponent {
  translate = inject(TranslateService);
}
