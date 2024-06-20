import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-alliancemembers',
  templateUrl: './alliancemembers.component.html',
})
export class AlliancemembersComponent implements OnInit, OnDestroy {
  public allianceMembers: {
    membre_id: number;
    username: string;
    membre_status: number;
    level: number;
    rank_name: string;
    xp: number;
    victory: number;
    field: number;
  }[];
  public allianceProfile = {
    alliance_name: '',
    alliance_id: 0,
  };

  private subMembers: Subscription;
  private subProfile: Subscription;
  private subTitle: Subscription;
  private subDesc: Subscription;
  public legend = {
    paused: 0,
    blocked: 0,
  };

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private socket: Socket,
    public user: User,
    private titleService: Title,
    private metaService: Meta,
    public translate: TranslateService
  ) {
    this.allianceMembers = [];
    this.subMembers = new Subscription();
    this.subProfile = new Subscription();
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
    this.subMembers.unsubscribe();
    this.subProfile.unsubscribe();
    this.subTitle.unsubscribe();
    this.subDesc.unsubscribe();
  }

  getMembers() {
    const id = this.route.snapshot.paramMap.get('id') ?? '0';
    const url =
      this.socket.url + '/api/allianceMembers/' + id.toString() + '.json';

    this.subMembers = this.http.get(url).subscribe(res => {
      this.allianceMembers = res as typeof this.allianceMembers;
      this.legend = {
        paused: 0,
        blocked: 0,
      };
      for (const p of this.allianceMembers) {
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

    this.subProfile = this.http.get(url).subscribe(alli => {
      const profile = alli as typeof this.allianceProfile;
      if (profile.alliance_id) {
        this.allianceProfile = profile;

        this.subTitle = this.translate
          .get('Alliance members:')
          .subscribe((res: string) => {
            this.titleService.setTitle(
              res + ' ' + this.allianceProfile.alliance_name
            );
          });
        this.subDesc = this.translate
          .get(
            'Members of the { value } alliance, their statistics and their rank.',
            { value: this.allianceProfile.alliance_name }
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
