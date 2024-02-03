import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment';
import { UserComponent as User } from '../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  public rerror: number;
  private subPlayer: Subscription;
  public login;

  facebookIcon = facebookIcon;
  googleIcon = googleIcon;

  constructor(
    protected http: HttpClient,
    private socket: Socket,
    public user: User,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({});
    this.rerror = 0;
    this.subPlayer = new Subscription();
    this.login = '';
  }

  ngOnInit() {
    const userId =
      this.route.snapshot.paramMap.get('id') ??
      localStorage.getItem('invite') ??
      0;
    const url = this.socket.url + '/api/playerProfile/' + userId + '.json';

    this.subPlayer = this.http.get(url).subscribe((resPlayer: object) => {
      const player = resPlayer as { membre_id: number; username: string };
      if (player?.membre_id) {
        this.login = player.username;
        localStorage.setItem('invite', player.membre_id.toString());
      }
    });

    this.registerForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      email: '',
      password: '',
      invite: userId,
    });

    this.socket.on('register', (data: { error: number }) => {
      this.rerror = data.error;
    });
  }

  ngOnDestroy() {
    this.subPlayer.unsubscribe();
    this.socket.removeListener('register');
  }

  onSubmit(data: object) {
    this.socket.emit('register', data);
  }

  selectServer() {
    if (environment.mobile == 1 || this.socket.local) {
      this.socket.setServer(this.registerForm.controls['server'].value);
      this.user.reload();
    } else {
      //Redirect to the selected server
      this.socket.redirect(this.registerForm.controls['server'].value);
    }
    this.login = '';
  }
}
