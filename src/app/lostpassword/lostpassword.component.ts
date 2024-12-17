import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class LostpasswordComponent implements OnInit, OnDestroy {
  public lostpasswordError: number;
  public lostvalue: string;

  private subLost: Subscription;
  private subTitle: Subscription;

  constructor(
    private http: HttpClient,
    private titleService: Title,
    public user: User,
    public translate: TranslateService,
    private socket: Socket
  ) {
    this.lostpasswordError = 0;
    this.lostvalue = '';
    this.subLost = new Subscription();
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.subTitle = this.translate
      .get('Forgot your password')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.subLost.unsubscribe();
    this.subTitle.unsubscribe();
  }

  lostpassword() {
    if (!this.lostvalue) {
      this.lostpasswordError = 4;
      return;
    }

    const url =
      this.socket.url +
      '/api/lostpassword/' +
      encodeURIComponent(this.lostvalue) +
      '.json';

    this.subLost = this.http.get(url).subscribe(res => {
      const result = res as { error?: number };
      if (result.error) {
        this.lostpasswordError = result.error;
      } else {
        this.lostpasswordError = 0;
      }
    });
  }
}
