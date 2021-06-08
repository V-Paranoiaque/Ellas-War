import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/help.component.html',
  styleUrls: ['../css/help.component.css']
})


export class Help {
  
  constructor(public user: User, private titleService: Title,
              public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.translate.get('Do you need help with Ellas War?').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
