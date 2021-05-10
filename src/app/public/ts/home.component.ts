import { Component, ViewEncapsulation } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  templateUrl: '../html/home.component.html',
  styleUrls: ['../css/home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class Home {
  private _newsUrl = environment.SOCKET_ENDPOINT+'/api/news-4.json';
  public localevars:any;
  public menu:number;
  public newsList:any;
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  
  environment = environment;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, private formBuilder: FormBuilder,
              private http: HttpClient, public translate: TranslateService) {
    this.localevars = {'store': {}};
    this.newsList = [];
    
    this.loginForm = this.formBuilder.group({});
    this.registerForm = this.formBuilder.group({});
    this.menu = 0;
  }
  
  ngOnInit() {
    this.http.get('../../../assets/i18n/'+this.translate.currentLang+'/localevars.json').subscribe(data =>{
      this.localevars = data;
    });
    
    this.http.get(this._newsUrl)
      .subscribe(res => {
        this.newsList = res;
      });
    
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
      mobile: environment.mobile
    });
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }
  
  onSubmit(data:object) {
    this.socket.emit('register', data);
  }
  
  setMenu(id:number) {
    this.menu = id;
  }
}
