import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-stats-mints.component.html'
})

export class AdminStatsMintsComponent {
  public list:{nb:number, drachma:number}[]=[];
  
  constructor(public user: User, public translate: TranslateService) {
    let production = 4200;
    let max = 100;
    let bonusNb:number = 80;
    
    for(let i=1;i<=bonusNb;i++) {
      this.list.push({
        'nb': i,
        'drachma': i*production
      });
    }
    
    for(let i=bonusNb+1;i<max;i++) {
      this.list.push({
        'nb': i,
        'drachma': i*production*(1+4*(i-bonusNb)/100)
      });
    }
    
    this.list.push({
      'nb': max,
      'drachma': max*production*(1+5*(max-bonusNb)/100)
    });
  }
}
