import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { Title, Meta } from '@angular/platform-browser';

import triangleExclamation from '@iconify/icons-fa6-solid/triangle-exclamation';
import userPlus from '@iconify/icons-fa6-solid/user-plus';

@Component({
  selector: 'app-allianceprofile',
  templateUrl: './allianceprofile.component.html',
})
export class AllianceprofileComponent implements OnInit, OnDestroy {
  private subMembers: Subscription;
  private subProfile1: Subscription;
  private subProfile2: Subscription;
  private subDesc: Subscription;

  allianceProfile = {
    alliance_id: 0,
    alliance_name: '',
    alliance_type: 0,
    recruitement_open: 0,
    alliance_img: '',
    chief_id: 0,
    username: '',
    creator_id: 0,
    founder: '',
    nbmembers: 0,
    victories: 0,
    defeats: 0,
    description: '',
  };
  public reported = 0;

  userPlus = userPlus;
  triangleExclamation = triangleExclamation;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private socket: Socket,
    public user: User,
    private titleService: Title,
    private metaService: Meta,
    public translate: TranslateService
  ) {
    this.allianceProfile.alliance_img =
      '../assets/styles/' +
      Tools.getStyle(this.user.getProperty('style') as string) +
      '/default-profile.webp';

    this.subMembers = new Subscription();
    this.subProfile1 = new Subscription();
    this.subProfile2 = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.getProfile();

    this.socket.on('allianceMembersRefresh', () => {
      this.getProfile();
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
    this.subMembers.unsubscribe();
    this.subProfile1.unsubscribe();
    this.subProfile2.unsubscribe();
    this.subDesc.unsubscribe();
  }

  getProfile() {
    const id = this.route.snapshot.paramMap.get('id') ?? '0';
    const url =
      this.socket.url + '/api/allianceProfile/' + id.toString() + '.json';

    if (id) {
      this.subMembers = this.http.get(url).subscribe(alli => {
        const profile = alli as typeof this.allianceProfile;
        if (profile.alliance_id) {
          this.allianceProfile = profile;

          this.subProfile1 = this.translate
            .get('Alliance profile')
            .subscribe((res1: string) => {
              this.subProfile2 = this.translate
                .get(':')
                .subscribe((res2: string) => {
                  this.titleService.setTitle(
                    res1 + res2 + ' ' + this.allianceProfile.alliance_name
                  );
                });
            });
          this.subDesc = this.translate
            .get('Visualize the statistics of the alliance')
            .subscribe((res: string) => {
              this.metaService.removeTag('name=description');
              this.metaService.addTag({
                name: 'description',
                content: res + ' ' + this.allianceProfile.alliance_name,
              });
            });
        } else {
          this.subProfile1 = this.translate
            .get("This alliance doesn't exist")
            .subscribe((res: string) => {
              this.allianceProfile.alliance_name = res;
            });
        }
      });
    } else {
      this.subProfile1 = this.translate
        .get("This alliance doesn't exist")
        .subscribe((res: string) => {
          this.allianceProfile.alliance_name = res;
        });
    }
  }

  report() {
    this.reported = 1;
    this.socket.emit('problemReport', {
      type: 2,
      id: this.allianceProfile.alliance_id,
    });
  }
}
