import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router'
import { UserComponent as User } from '../../../services/user.service';

import discordIcon from '@iconify-icons/logos/discord-icon';
import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  templateUrl: '../html/home.component.html',
  styleUrls: ['../css/home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit, OnDestroy {
  public localevars:any;
  public menu:number;
  public newsList:any;
  public rerror: number;
  
  private subLang:Subscription;
  private subNews:Subscription;
  private subTitle:Subscription;
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  
  environment = environment;
  
  discordIcon = discordIcon;
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, private formBuilder: FormBuilder,
              private http: HttpClient, public translate: TranslateService, 
              public user: User, private router: Router,
              private titleService: Title, private deviceService: DeviceDetectorService) {
    this.localevars = {'store': {}};
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
    this.subLang = this.http.get('./assets/i18n/'+this.translate.currentLang+'/localevars.json').subscribe((data:any) =>{
      this.localevars = data as typeof this.localevars;
    });
    
    let url = this.socket.url+'/api/news-4.json';
    this.subNews = this.http.get(url).subscribe((res: any) => {
      this.newsList = res;
    });
    
    this.loginForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      password: '',
      mobile: environment.mobile
    });
    this.registerForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      email: '',
      password: ''
    });
    
    this.subTitle = this.translate.get('Ellas War, free online strategy game').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
    
    this.socket.on('register', (data:{error:number}) => {
      this.rerror = data.error;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('register');
    this.subLang.unsubscribe();
    this.subNews.unsubscribe();
    this.subTitle.unsubscribe();
  }
  
  onSubmit(data:object) {
    this.socket.emit('register', data);
  }
  
  onSubmitConnect(data:object) {
    this.router.navigateByUrl('login');
    const info = data as {username:string,password:string}
    this.socket.emit('connection', {
      username: info.username,
      password: info.password,
      extra: this.user.getExtra(this.deviceService.getDeviceInfo())
    });
  }
  
  setMenu(id:number) {
    this.menu = id;
  }
  
  selectServerRegister() {
    if(environment.mobile == 1 || this.socket.local) {
      this.socket.setServer(this.registerForm.controls['server'].value);
      this.user.reload();
    }
    else {
      //Redirect to the selected server
      this.socket.redirect(this.registerForm.controls['server'].value);
    }
  }
  
  selectServerLogin() {
    if(environment.mobile == 1 || this.socket.local) {
      this.socket.setServer(this.loginForm.controls['server'].value);
      this.user.reload();
    }
    else {
      //Redirect to the selected server
      this.socket.redirect(this.loginForm.controls['server'].value);
    }
  }
}
