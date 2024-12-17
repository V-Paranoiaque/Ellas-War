import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-alliance-archives-text',
  templateUrl: './alliance-archives-text.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class AllianceArchivesTextSubComponent {
  @Input() msg!: {
    type: number;
    title: {
      attacker: string;
      defender: string;
      ask_id: number;
      refuse: number;
      destroy: number;
      chief_old: number;
      ask_name: string;
      dst_name: string;
    };
    content: {
      attacker: string;
      defender: string;
      benefits: number;
      username: string;
      dst_name: string;
      player_name: string;
      member: string;
      player: string;
      nameWinner: string;
      vicWinner: string;
      nameLooser: string;
      vicLooser: number;
      chief_old: string;
      name1: string;
      name2: string;
      chief_new: string;
      ask_name: string;
      attacking_name: string;
      defender_name: string;
    };
    alliance_history_date: number;
  };

  constructor(
    public translate: TranslateService,
    public user: User
  ) {}
}
