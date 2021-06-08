import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/confidentiality.component.html'
})

export class Confidentiality {
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.translate.get('Privacy Policy of the game').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
