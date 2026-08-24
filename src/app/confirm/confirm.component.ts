import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { TranslateDirective } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
  ],
})
export class ConfirmComponent implements OnInit {
  user = inject(User);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly socket = inject(Socket);
  private readonly destroyRef = inject(DestroyRef);

  public confirmResult = signal(0);

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

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: object) => {
        const res = result as { error: number };
        this.confirmResult.set(res.error);
      });
  }
}
