import { Component, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temple-popup',
  templateUrl: './temple-popup.sub-component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class TemplePopupSubComponent {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public temple = 0;
  public price: { resource: string; quantity: number }[] = [];

  setTemple(id: number) {
    if (id === this.temple) {
      this.temple = 0;
    } else {
      this.temple = id;
    }
  }

  canBuild() {
    for (const i in this.price) {
      if (
        this.user.getPropertyNb(this.price[i].resource) < this.price[i].quantity
      ) {
        return false;
      }
    }
    return true;
  }
}
