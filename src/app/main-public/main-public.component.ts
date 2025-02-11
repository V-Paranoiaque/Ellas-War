import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import discordIcon from '@iconify-icons/logos/discord-icon';
import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  selector: 'app-main-public',
  templateUrl: './main-public.component.html',
  styleUrls: ['./main-public.component.css'],
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MainPublicComponent implements OnInit, OnDestroy {
  public localevars = {
    facebook: '',
    store: {
      amazon: '',
      google: '',
      microsoft: '',
      pling: '',
      snap: '',
    },
  };
  public menu: number;
  public newsList: {
    title: string;
    news_date: number;
    link: string;
  }[];
  public rerror: number;
  public selectedTemple = 'zeus';

  private subLang: Subscription;
  private subNews: Subscription;
  private subTitle: Subscription;

  loginForm: FormGroup;
  registerForm: FormGroup;

  environment = environment;

  discordIcon = discordIcon;
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;

  constructor(
    private readonly socket: Socket,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public translate: TranslateService,
    public user: User,
    private readonly router: Router,
    private titleService: Title
  ) {
    this.newsList = [];

    this.loginForm = this.formBuilder.group({});
    this.registerForm = this.formBuilder.group({});
    this.menu = 0;
    this.rerror = 0;
    this.subLang = new Subscription();
    this.subNews = new Subscription();
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    const userId = localStorage.getItem('invite') ?? 0;

    this.subLang = this.http
      .get('./assets/i18n/' + this.translate.currentLang + '/localevars.json')
      .subscribe(data => {
        this.localevars = data as typeof this.localevars;
      });

    const url = this.socket.url + '/api/news-4.json';
    this.subNews = this.http.get(url).subscribe(res => {
      this.newsList = res as typeof this.newsList;
    });

    this.loginForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      password: '',
      mobile: environment.mobile,
    });
    this.registerForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      email: '',
      password: '',
      mobile: environment.mobile,
      invite: userId,
    });

    this.subTitle = this.translate
      .get('Ellas War, free online strategy game')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });

    this.socket.on('register', (data: { error: number }) => {
      this.rerror = data.error;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('register');
    this.subLang.unsubscribe();
    this.subNews.unsubscribe();
    this.subTitle.unsubscribe();
  }

  onSubmit(data: object) {
    this.socket.emit('register', data);
  }

  onSubmitConnect(data: object) {
    void this.router.navigateByUrl('login');
    const info = data as { username: string; password: string };
    this.socket.emit('connection', {
      username: info.username,
      password: info.password,
      extra: this.user.getExtra(),
    });
  }

  setMenu(id: number) {
    this.menu = id;
  }

  selectServerRegister() {
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
  }

  selectServerLogin() {
    if (environment.mobile == 1 || this.socket.local) {
      this.socket.setServer(this.loginForm.controls['server'].value as string);
      this.user.reload();
    } else {
      //Redirect to the selected server
      this.socket.redirect(this.loginForm.controls['server'].value as string);
    }
  }

  selectTemple(name: string) {
    this.selectedTemple = name;
  }
}
