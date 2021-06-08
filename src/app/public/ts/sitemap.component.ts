import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/sitemap.component.html'
})

export class SiteMap {
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.translate.get('Find your way and visit ancient Greece').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
