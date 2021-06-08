import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/team.component.html'
})

export class Team {
  
  constructor(private titleService: Title, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.translate.get('The Ellas War\'s team').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
