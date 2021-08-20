import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router'
import { User } from '../../../services/user.service';

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
  
  private subLang:any;
  private subNews:any;
  private subTitle:any;
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  
  environment = environment;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, private formBuilder: FormBuilder,
              private http: HttpClient, public translate: TranslateService, 
              public user: User, private router: Router,
              private titleService: Title) {
    this.localevars = {'store': {}};
    this.newsList = [];
    
    this.loginForm = this.formBuilder.group({});
    this.registerForm = this.formBuilder.group({});
    this.menu = 0;
    this.rerror = 0;
  }
  
  ngOnInit() {
    this.subLang = this.http.get('./assets/i18n/'+this.translate.currentLang+'/localevars.json').subscribe((data:any) =>{
      this.localevars = data;
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
    
    this.socket.on('register', (data:any) => {
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
    this.socket.emit('connection', data);
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
