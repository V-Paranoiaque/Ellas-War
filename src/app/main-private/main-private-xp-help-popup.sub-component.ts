import { Component, Input, inject } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-private-xp-help-popup',
  templateUrl: './main-private-xp-help-popup.sub-component.html',
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class MainPrivateXpHelpPopupSubComponent {
  user = inject(User);

  @Input() info!: { player1: number; player2: number };

  eloDiff(p1: number, p2: number, coef: number) {
    const player1 = p1 / 100;
    const player2 = p2 / 100;
    let d = (player1 - player2) / 2;

    if (d > 400) {
      d = 400;
    }

    const modif = 10 * (coef - this.r_elo(d));

    return Math.round(100 * modif);
  }

  r_elo(a: number) {
    return 1 / (1 + Math.pow(10, -a / 400));
  }
}
