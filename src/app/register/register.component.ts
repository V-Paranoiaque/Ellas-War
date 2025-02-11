import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from './../../environments/environment';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  public rerror: number;
  private subPlayer: Subscription;
  private subTitle: Subscription;
  public login;

  facebookIcon = facebookIcon;
  googleIcon = googleIcon;

  constructor(
    protected http: HttpClient,
    private readonly socket: Socket,
    public user: User,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private titleService: Title,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({});
    this.rerror = 0;
    this.subPlayer = new Subscription();
    this.subTitle = new Subscription();
    this.login = '';
  }

  ngOnInit() {
    const userId =
      this.route.snapshot.paramMap.get('id') ??
      localStorage.getItem('invite') ??
      0;
    const url =
      this.socket.url + '/api/playerProfile/' + userId.toString() + '.json';

    this.subPlayer = this.http.get(url).subscribe((resPlayer: object) => {
      const player = resPlayer as { membre_id: number; username: string };
      if (player.membre_id) {
        this.login = player.username;
        localStorage.setItem('invite', player.membre_id.toString());
      }
    });

    this.subTitle = this.translate
      .get(
        'Register on Ellas War, an ancient Greece free online multiplayer wargame'
      )
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
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
    this.subTitle.unsubscribe();
  }

  onSubmit(data: object) {
    this.socket.emit('register', data);
  }

  selectServer() {
    if (environment.mobile == 1 || this.socket.local) {
      this.socket.setServer(
        this.registerForm.controls['server'].value as string
      );
      this.user.reload();
    } else {
      //Redirect to the selected server
      this.socket.redirect(
        this.registerForm.controls['server'].value as string
      );
    }
    this.login = '';
  }
}
