import { Component, Input } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-archives-title',
  templateUrl: './alliance-archives-title.sub-component.html',
})
export class AllianceArchivesTitleSubComponent {
  @Input() type!: number;
  @Input() title!: {
    attacker: string;
    defender: string;
    ask_id: number;
    refuse: number;
    destroy: number;
    chief_old: number;
    ask_name: string;
    dst_name: string;
    attacking_name: string;
    defender_name: string;
    member: string;
    chief_new: string;
  };

  constructor(public user: User) {}
}
