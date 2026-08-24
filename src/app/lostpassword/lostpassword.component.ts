import { RouterModule } from '@angular/router';
import {
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormsModule } from '@angular/forms';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class LostpasswordComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly titleService = inject(Title);
  user = inject(User);
  translate = inject(TranslateService);
  private readonly socket = inject(Socket);
  private readonly destroyRef = inject(DestroyRef);

  public lostpasswordError = signal(0);
  public lostvalue = '';

  private subTitle: Subscription;

  constructor() {
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.subTitle = this.translate
      .get('Forgot your password')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.subTitle.unsubscribe();
  }

  lostpassword() {
    if (!this.lostvalue) {
      this.lostpasswordError.set(4);
      return;
    }

    const url =
      this.socket.url +
      '/api/lostpassword/' +
      encodeURIComponent(this.lostvalue) +
      '.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        const result = res as { error?: number };
        if (result.error) {
          this.lostpasswordError.set(result.error);
        } else {
          this.lostpasswordError.set(0);
        }
      });
  }
}
