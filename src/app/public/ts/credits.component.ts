import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/credits.component.html'
})

export class Credits {
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.translate.get('Game credits').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
