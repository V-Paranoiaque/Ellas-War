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
import { TranslateDirective } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

@Component({
  selector: 'app-honor-help-popup',
  templateUrl: './honor-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective, UserProfileSubComponent],
})
export class HonorHelpPopupSubComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly socket = inject(Socket);
  private readonly destroyRef = inject(DestroyRef);

  public list = signal<
    {
      id: number;
      player_id: number;
      username: string;
      honor: number;
    }[]
  >([]);

  ngOnInit() {
    const url = this.socket.url + '/api/historyHonor.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.list.set(
          result as {
            id: number;
            player_id: number;
            username: string;
            honor: number;
          }[]
        );
      });
  }
}
