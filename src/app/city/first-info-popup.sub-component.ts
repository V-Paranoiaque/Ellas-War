import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-first-info-popup',
  templateUrl: './first-info-popup.sub-component.html',
  imports: [EwIconSubComponent, RouterModule, TranslateModule],
})
export class FirstInfoPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
