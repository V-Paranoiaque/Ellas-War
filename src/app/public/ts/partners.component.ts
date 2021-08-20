import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/partners.component.html'
})

export class PartnersComponent implements OnInit, OnDestroy {
  private sub:any;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
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
