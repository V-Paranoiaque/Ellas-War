import { RouterModule } from '@angular/router';
import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { SocketComponent as Socket } from '../../services/socketio.service';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-getfavors',
  templateUrl: './getfavors.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class GetfavorsComponent implements OnInit {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  ngOnInit() {
    this.user.checkPermissions([1, 3, 4]);
  }

  save(nb: number) {
    //This is just used for our stats
    this.socket.emit('paypalSave', nb);
  }
}
