import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, DestroyRef, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { TranslateDirective } from "@ngx-translate/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  imports: [RouterModule, TranslateDirective],
})
export class UnsubscribeComponent implements OnInit, OnDestroy {
  user = inject(User);
  private readonly socket = inject(Socket);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef)

  public id = '';
  public check = '';
  public sub: Subscription;
  public unsubscribeResult = signal({
    error: 0,
  });

  constructor() {
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

    this.sub = this.http.get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.unsubscribeResult.set(result as { error: number });
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
    this.unsubscribeResult.set({ error: 5 })
  }
}
