import { Component } from '@angular/core';

@Component({
  templateUrl: '../html/admin-xp.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminXpComponent {
  
  public player1:number;
  public player2:number;
  
  constructor() {
    this.player1 = 10000;
    this.player2 = 10000;
  }
  
  eloDiff(p1:number, p2:number, coef:number) {
    let player1 = p1/100;
    let player2 = p2/100;
    let d = (player1-player2)/2;
    
    if(d > 400) {
      d = 400;
    }
    
    let modif = 10*(coef - this.r_elo(d));
    
    return Math.round(100*modif);
  }
  
  r_elo(a:number) {
    return 1/(1+Math.pow(10, -a/400));
  }
}
