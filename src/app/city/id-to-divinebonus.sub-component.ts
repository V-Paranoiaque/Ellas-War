import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToolsComponent } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-id-to-divinebonus',
  templateUrl: './id-to-divinebonus.sub-component.html',
})
export class IdToDivineBonusSubComponent {
  @Input()
  id!: number;
  Tools = ToolsComponent;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
