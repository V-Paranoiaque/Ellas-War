import { Component, ViewEncapsulation } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

export class Home {
  public localevars:any;
  public menu:number;
  public newsList:any;
  public rerror: number;
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  
  environment = environment;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, private formBuilder: FormBuilder,
              private http: HttpClient, public translate: TranslateService, 
              public user: User, private router: Router) {
    this.localevars = {'store': {}};
    this.newsList = [];
    
    this.loginForm = this.formBuilder.group({});
    this.registerForm = this.formBuilder.group({});
    this.menu = 0;
    this.rerror = 0;
  }
  
  ngOnInit() {
    this.http.get('./assets/i18n/'+this.translate.currentLang+'/localevars.json').subscribe(data =>{
      this.localevars = data;
    });
    
    if(this.user.config.url) {
      let url = this.user.config.url+'/api/news-4.json';
      this.http.get(url).subscribe(res => {
        this.newsList = res;
      });
    }
    
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
    
    this.socket.on('register', (data:any) => {
      this.rerror = data.error;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('register');
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
