import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: '../html/credits.component.html'
})

export class CreditsComponent implements OnInit, OnDestroy {
  private sub:Subscription;
  
  constructor(private titleService: Title, public translate: TranslateService) {
    this.sub = new Subscription();
  }
  
  ngOnInit() {
    this.sub = this.translate.get('Game credits').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
