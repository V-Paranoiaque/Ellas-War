import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

import { IcIconComponent } from 'src/services/ic-icon.service';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  selector: 'app-alliance-rank-popup',
  templateUrl: './alliance-rank-popup.sub-component.html',
  imports: [FormsModule, IcIconComponent, TranslateModule],
})
export class AllianceRankPopupSubComponent {
  @Input() info!: {
    membre_id: number;
    username: string;
    level: number;
    allow_eject: number;
    help: number;
    rank_name: string;
    second: number;
    recruiter: number;
    strategist: number;
    treasurer: number;
  };

  questionCircle = questionCircle;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  canSave() {
    //Chief
    if (this.user.getPropertyNb('id') === this.user.getPropertyNb('chief')) {
      return true;
    }

    //Permission to transmit or second
    if (
      this.user.getPropertyNb('second') >= 1 ||
      this.user.getPropertyNb('recruiter') === 2 ||
      this.user.getPropertyNb('strategist') === 2 ||
      this.user.getPropertyNb('treasurer') === 2
    ) {
      return true;
    }

    return false;
  }

  save() {
    if (this.info.help === 5) {
      this.socket.emit('chiefEdit', this.info.membre_id);
    } else {
      const data = {
        id: this.info.membre_id,
        rank_name: this.info.rank_name,
        second: this.info.second,
        recruiter: this.info.recruiter,
        strategist: this.info.strategist,
        treasurer: this.info.treasurer,
      };
      this.socket.emit('rankEdit', data);
    }
  }

  setHelp(nb: number) {
    this.info.help = nb;
  }
}
