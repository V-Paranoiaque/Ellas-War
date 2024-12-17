import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css'],
  imports: [
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  loginForm: FormGroup;
  loginError: number;

  googleIcon = googleIcon;

  constructor(
    private titleService: Title,
    public translate: TranslateService,
    private socket: Socket,
    public user: User,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({});
    this.loginError = 0;
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.user.checkPermissions([0]);

    this.socket.on('connection', (data: string) => {
      if (data) {
        this.socket.emit('ewAuth', {
          token: data,
          extra: this.user.getExtra(),
        });
        localStorage.setItem('token', data);
      } else {
        this.loginError = 1;
        localStorage.removeItem('token');
      }
    });

    this.loginForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      password: '',
      mobile: environment.mobile,
    });

    this.sub = this.translate
      .get('Connect and Join your City')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.socket.removeListener('connection');
    this.sub.unsubscribe();
  }

  onSubmit(data: object) {
    const info = data as { username: string; password: string };
    this.socket.emit('connection', {
      username: info.username,
      password: info.password,
      extra: this.user.getExtra(),
    });
  }

  selectServer() {
    if (environment.mobile == 1 || this.socket.local) {
      this.socket.setServer(this.loginForm.controls['server'].value as string);
      this.user.reload();
    } else {
      //Redirect to the selected server
      this.socket.redirect(this.loginForm.controls['server'].value as string);
    }
  }
}
