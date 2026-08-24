import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, DestroyRef, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

@Component({
  selector: 'app-alliancemembers',
  templateUrl: './alliancemembers.component.html',
  imports: [
    CommonModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
    UserProfileSubComponent,
  ],
})
export class AlliancemembersComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly socket = inject(Socket);
  user = inject(User);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly destroyRefProfile = inject(DestroyRef);
  private readonly destroyRefMembers = inject(DestroyRef);

  public allianceMembers = signal<{
    membre_id: number;
    username: string;
    membre_status: number;
    level: number;
    rank_name: string;
    xp: number;
    victory: number;
    field: number;
  }[]>([]);
  public allianceProfile = signal<{
    alliance_name: string,
    alliance_id: number
  }
  >({
    alliance_name: '',
    alliance_id: 0,

  });

  private subTitle: Subscription;
  private subDesc: Subscription;
  public legend = {
    paused: 0,
    blocked: 0,
  };

  constructor() {
    this.subTitle = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.getMembers();
    this.getProfile();

    this.socket.on('allianceMembersRefresh', () => {
      this.getProfile();
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
    this.subTitle.unsubscribe();
    this.subDesc.unsubscribe();
  }

  getMembers() {
    const id = this.route.snapshot.paramMap.get('id') ?? '0';
    const url =
      this.socket.url + '/api/allianceMembers/' + id.toString() + '.json';

    this.http.get(url)
      .pipe(takeUntilDestroyed(this.destroyRefMembers))
      .subscribe(res => {
        this.allianceMembers.set(res as {
          membre_id: number;
          username: string;
          membre_status: number;
          level: number;
          rank_name: string;
          xp: number;
          victory: number;
          field: number;
        }[]);
        this.legend = {
          paused: 0,
          blocked: 0,
        };
        for (const p of this.allianceMembers()) {
          if (p.membre_status === 3 || p.membre_status === 5) {
            this.legend.blocked = 1;
          } else if (p.membre_status === 4) {
            this.legend.paused = 1;
          }
        }
      });
  }

  getProfile() {
    const id = this.route.snapshot.paramMap.get('id') ?? '0';
    const url =
      this.socket.url + '/api/allianceProfile/' + id.toString() + '.json';

    this.http
      .get<{
        alliance_name: string,
        alliance_id: number,
      }>(url)
      .pipe(takeUntilDestroyed(this.destroyRefProfile))
      .subscribe(alli => {
        const profile = alli as {
          alliance_name: string,
          alliance_id: number,
        };
        if (profile.alliance_id) {
          this.allianceProfile.set(profile);

          this.subTitle = this.translate
            .get('Alliance members:')
            .subscribe((res: string) => {
              this.titleService.setTitle(
                res + ' ' + this.allianceProfile().alliance_name
              );
            });
          this.subDesc = this.translate
            .get(
              'Members of the { value } alliance, their statistics and their rank.',
              { value: this.allianceProfile().alliance_name }
            )
            .subscribe((res: string) => {
              this.metaService.removeTag('name=description');
              this.metaService.addTag({
                name: 'description',
                content: res,
              });
            });
        }
      });
  }
}
