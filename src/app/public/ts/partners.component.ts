import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/partners.component.html'
})

export class Partners {

  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
  }
  
  ngOnInit() {
    this.translate.get('Ellas War Partners').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
