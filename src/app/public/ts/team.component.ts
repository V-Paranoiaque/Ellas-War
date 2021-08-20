import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/team.component.html'
})

export class TeamComponent implements OnInit, OnDestroy {
  private sub:any;
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.sub = this.translate.get('The Ellas War\'s team').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
