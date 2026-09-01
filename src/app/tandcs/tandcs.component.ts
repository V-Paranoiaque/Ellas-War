import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-tandcs',
  templateUrl: './tandcs.component.html',
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class TandcsComponent implements OnInit {
  private readonly tandcsComponentChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly titleService = inject(Title);
  translate = inject(TranslateService);

  ngOnInit() {
    this.translate
      .get('Terms and Conditions of use')
      .subscribe((res: string) => {
        this.tandcsComponentChangeDetectorRef.markForCheck();
        this.titleService.setTitle(res);
      });
  }
}
