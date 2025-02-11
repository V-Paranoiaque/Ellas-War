import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  imports: [RouterModule, TranslateModule],
})
export class UnsubscribeComponent implements OnInit, OnDestroy {
  public id = '';
  public check = '';
  public sub: Subscription;
  public unsubscribeResult = {
    error: 0,
  };

  constructor(
    public user: User,
    private readonly socket: Socket,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.check = this.route.snapshot.paramMap.get('check') ?? '';

    const url =
      this.socket.url +
      '/api/unsubscribe/' +
      encodeURIComponent(this.id) +
      '/' +
      encodeURIComponent(this.check) +
      '.json';

    this.sub = this.http.get(url).subscribe(result => {
      this.unsubscribeResult = result as { error: number };
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  unsubscribeConfirm() {
    const msg = {
      id: this.id,
      code: this.check,
    };
    this.socket.emit('unsubscribeValidate', msg);
    this.unsubscribeResult.error = 5;
  }
}
