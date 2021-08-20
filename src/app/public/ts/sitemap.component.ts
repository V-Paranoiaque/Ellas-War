import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/sitemap.component.html'
})

export class SiteMapComponent implements OnInit, OnDestroy {
  private sub:any;
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.sub = this.translate.get('Find your way and visit ancient Greece').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
