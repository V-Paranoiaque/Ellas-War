import { computed, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly translate = inject(TranslateService);

  readonly currentLocale = computed<string>(
    () => this.translate.currentLang() ?? this.translate.fallbackLang() ?? 'en'
  );
}
