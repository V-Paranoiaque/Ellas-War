import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/partners.component.html'
})

export class PartnersComponent implements OnInit, OnDestroy {
  private sub:Subscription;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
    this.sub = new Subscription();
  }
  
  ngOnInit() {
    this.sub = this.translate.get('Ellas War Partners').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
