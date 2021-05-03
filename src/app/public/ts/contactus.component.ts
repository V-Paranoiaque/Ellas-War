import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/contactus.component.html'
})

export class ContactUs {
  
  public contactemail:string;
  public contactError:number;
  public contactname:string;
  public contacttext:string;
  
  constructor(private router: Router, public user: User, private socket: Socket) {
    this.contactemail = '';
    this.contactError = 0;
    this.contactname = '';
    this.contacttext = '';
  }
  
  ngOnInit() {
    //Redirect to the support page if connected
    if(this.user.getInit() == 1 && this.user.getId() > 0) {
      this.router.navigate(['/support']);
    }
    
    this.socket.on('contact', (data:any) => {
      this.contactError = data;
    });
  }
  
  contactsend() {
    this.contactError = 0;
    var info = ({
      'name': this.contactname,
      'email': this.contactemail,
      'text': this.contacttext
    });
    this.socket.emit('contact', info);
  }
}
