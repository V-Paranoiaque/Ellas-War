import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/help.component.html',
  styleUrls: ['../css/help.component.css']
})


export class HelpComponent implements OnInit, OnDestroy {
  private sub:Subscription;
  
  constructor(public user: User, private titleService: Title,
              public translate: TranslateService) {
    this.sub = new Subscription();
  }
  
  ngOnInit() {
    this.sub = this.translate.get('Do you need help with Ellas War?').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
