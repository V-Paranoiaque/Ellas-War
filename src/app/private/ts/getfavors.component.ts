import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/getfavors.component.html'
})

export class GetFavorsComponent implements OnInit {
  public checkoutForm:any;
  
  constructor(public user: User, public translate: TranslateService) {
  }

  ngOnInit() {
    this.user.checkPermissions([1,3,4]);
  }
}
