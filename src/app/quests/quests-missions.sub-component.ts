import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  selector: 'app-quests-missions',
  templateUrl: './quests-missions.sub-component.html',
  styleUrls: ['./quests.component.css'],
})
export class QuestsMissionsSubComponent implements OnInit, OnDestroy {
  public localevars = {
    facebook: '',
  };
  private sub: Subscription;

  facebookIcon = facebookIcon;
  questionCircle = questionCircle;

  constructor(
    private socket: Socket,
    public user: User,
    private http: HttpClient,
    public translate: TranslateService
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.http
      .get('./assets/i18n/' + this.translate.currentLang + '/localevars.json')
      .subscribe(data => {
        this.localevars = data as typeof this.localevars;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getDefenseCurrent() {
    const datas = this.user.getProperty('datas') as {
      army: { defense: number }[];
      building: { defense: number; type: number }[];
    };
    let def = 0;

    for (const i in datas.army) {
      if (datas.army[i].defense) {
        def += this.user.getPropertyNb(i) * datas.army[i].defense;
      }
    }
    for (const i in datas.building) {
      if (datas.building[i].defense && datas.building[i].type === 2) {
        def += this.user.getPropertyNb(i) * datas.building[i].defense;
      }
    }

    return def;
  }

  questValidate() {
    this.socket.emit('questValidate');
  }
}
