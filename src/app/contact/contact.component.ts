import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [FormsModule, TranslateModule],
})
export class ContactComponent implements OnInit, OnDestroy {
  public contactemail: string;
  public contactError: number;
  public contactname: string;
  public contacttext: string;

  private sub: Subscription;

  constructor(
    private readonly router: Router,
    public user: User,
    private readonly socket: Socket,
    public translate: TranslateService,
    private titleService: Title
  ) {
    this.contactemail = '';
    this.contactError = 0;
    this.contactname = '';
    this.contacttext = '';
    this.sub = new Subscription();
  }

  ngOnInit() {
    //Redirect to the support page if connected
    if (this.user.getInit() == 1 && this.user.getPropertyNb('id') > 0) {
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
