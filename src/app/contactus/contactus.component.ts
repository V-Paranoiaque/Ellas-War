import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  imports: [
    FormsModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateModule,
  ],
})
export class ContactusComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  user = inject(User);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  private titleService = inject(Title);

  public contactemail: string;
  public contactError: number;
  public contactname: string;
  public contacttext: string;

  private sub: Subscription;

  constructor() {
    this.contactemail = '';
    this.contactError = 0;
    this.contactname = '';
    this.contacttext = '';
    this.sub = new Subscription();
  }

  ngOnInit() {
    //Redirect to the support page if connected
    if (this.user.init == 1 && this.user.getPropertyNb('id') > 0) {
      void this.router.navigate(['/support']);
    }

    this.sub = this.translate
      .get('Contact the game team')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });

    this.socket.on('contact', data => {
      this.contactError = data as typeof this.contactError;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('contact');
    this.sub.unsubscribe();
  }

  contactsend() {
    this.contactError = 0;
    const info = {
      name: this.contactname,
      email: this.contactemail,
      text: this.contacttext,
    };
    this.socket.emit('contact', info);
  }
}
