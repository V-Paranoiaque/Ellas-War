import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-candidate-popup',
  templateUrl: '../html/alliance-candidate-popup.sub-component.html'
})

export class AllianceCandidatePopup {
  
  @Input() candidate:any;
  
  constructor(private router: Router, private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
  }
  
  ngOnDestroy() {
  }
  
  accept() {
    this.socket.emit('myAllianceAccept', this.candidate.membre_id);
  }
  
  refuse() {
    this.socket.emit('myAllianceRefuse', this.candidate.membre_id);
  }
}
