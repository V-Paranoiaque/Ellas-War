import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/tandcs.component.html'
})

export class TAndCsComponent implements OnInit, OnDestroy {
  private sub:any;
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.sub = this.translate.get('Terms and Conditions of use').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
