import { Router, RouterModule } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { environment } from './../../environments/environment';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { IcIconComponent } from '../../services/ic-icon.service';
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
    TranslateDirective,
    TranslatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
})
export class MainPublicComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  private readonly formBuilder = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  user = inject(User);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);

  public localevars = {
    facebook: '',
    store: {
      google: '',
      microsoft: '',
      pling: '',
      snap: '',
    },
  };
  public menu: number;
  public rerror: number;
  public selectedTemple = 'zeus';

  private subLang: Subscription;
  private subTitle: Subscription;

  loginForm: FormGroup;
  registerForm: FormGroup;

  environment = environment;

  discordIcon = discordIcon;
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;

  constructor() {
    this.loginForm = this.formBuilder.group({});
    this.registerForm = this.formBuilder.group({});
    this.menu = 0;
    this.rerror = 0;
    this.subLang = new Subscription();
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    const userId = localStorage.getItem('invite') ?? 0;

    this.subLang = this.http
      .get('./assets/i18n/' + this.currentLocale() + '/localevars.json')
      .subscribe(data => {
        this.localevars = data as typeof this.localevars;
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
