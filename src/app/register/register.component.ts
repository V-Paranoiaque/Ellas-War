import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { environment } from './../../environments/environment';
import { UserComponent as User } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IcIconComponent } from '../../services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    ReactiveFormsModule,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  protected http = inject(HttpClient);
  private readonly socket = inject(Socket);
  user = inject(User);
  private readonly route = inject(ActivatedRoute);
  translate = inject(TranslateService);
  private readonly titleService = inject(Title);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  registerForm: FormGroup;
  public rerror: number;
  private subTitle: Subscription;
  public login = signal('');

  facebookIcon = facebookIcon;
  googleIcon = googleIcon;

  constructor() {
    this.registerForm = this.formBuilder.group({});
    this.rerror = 0;
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    const userId =
      this.route.snapshot.paramMap.get('id') ??
      localStorage.getItem('invite') ??
      0;
    const url =
      this.socket.url + '/api/playerProfile/' + userId.toString() + '.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resPlayer: object) => {
        const player = resPlayer as { membre_id: number; username: string };
        if (player.membre_id) {
          this.login.set(player.username);
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
    this.login.set('');
  }
}
