import { Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/contactus.component.html'
})

export class ContactUsComponent implements OnInit, OnDestroy {
  
  public contactemail:string;
  public contactError:number;
  public contactname:string;
  public contacttext:string;
  
  private sub:Subscription;
  
  constructor(private router: Router, public user: User, private socket: Socket,
              public translate: TranslateService, private titleService: Title) {
    this.contactemail = '';
    this.contactError = 0;
    this.contactname = '';
    this.contacttext = '';
    this.sub = new Subscription();
  }
  
  ngOnInit() {
    //Redirect to the support page if connected
    if(this.user.getInit() == 1 && this.user.getId() > 0) {
      this.router.navigate(['/support']);
    }
    
    this.sub = this.translate.get('Contact the game team').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
    
    this.socket.on('contact', (data:any) => {
      this.contactError = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('contact');
    this.sub.unsubscribe();
  }
  
  contactsend() {
    this.contactError = 0;
    const info = ({
      'name': this.contactname,
      'email': this.contactemail,
      'text': this.contacttext
    });
    this.socket.emit('contact', info);
  }
}
