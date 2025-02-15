import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class ConfirmComponent implements OnInit, OnDestroy {
  public confirmResult: number;
  private sub: Subscription;

  constructor(
    public user: User,
    private http: HttpClient,
    private route: ActivatedRoute,
    private readonly socket: Socket
  ) {
    this.confirmResult = 0;
    this.sub = new Subscription();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const check = this.route.snapshot.paramMap.get('check') ?? '';

    const url =
      this.socket.url +
      '/api/confirmcheck/' +
      encodeURIComponent(id) +
      '/' +
      encodeURIComponent(check) +
      '.json';

    this.sub = this.http.get(url).subscribe((result: object) => {
      const res = result as { error: number };
      this.confirmResult = res.error;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
