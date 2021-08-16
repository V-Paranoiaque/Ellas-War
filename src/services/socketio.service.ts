import { EventEmitter } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from './../environments/environment';

export class Socket {
  
  public onChange: EventEmitter<any> = new EventEmitter<any>();
  
  socket: any;
  server: string;
  url: string;
  local: boolean;
  
  constructor() {
    if(window.location.port && window.location.port != '443') {
      this.local = true;
    }
    else {
      this.local = false;
    }
    this.server = '';
    this.url = '';
  }
  
  setServer(server:string) {
    this.server = server;
    localStorage.setItem('server', server);
    
    //Setup the new connection
    this.setupSocketConnection(this.getServerUrl(server));
    
    //Reload the app
    this.onChange.emit({action: 'appReload'});
  }
  
  setupSocketConnection(url:string) {
    //Close previous connection
    if(this.socket) {
      this.socket.close();
    }
    
    let ws = url.replace('https', 'wss');
    this.socket = io(ws);
    this.url = url;
    
    this.socket.on("connect", () => {
      this.loadUser();
    });
  }
  
  emit(socketName: string, data:any=[]) {
    this.socket.emit(socketName, data);
  }
  
  loadUser() {
    this.emit('loadConfig');
    
    let localToken = localStorage.getItem('token');
    if(localToken) {
      this.emit('ewAuth', {'token': localToken});
    }
  }
  
  on(socketName: string, callback:any) {
    this.socket.on(socketName, (data:any) =>{
      callback(data);
    })
  }

  removeListener(socketName: string) {
    this.socket.removeListener(socketName);
  }
  
  /**
   * Server management
   **/
  detectServer() {
    if(environment.mobile == 0) {
      //Local
      if(this.local) {
        this.server = 'dev';
        return environment.SERVER_DEV;
      }
      else {
        let url = window.location.hostname;
        this.server = this.getUrlServer(url);
        return 'https://'+url;
      }
    }
    else {
      let url;
      if(localStorage.getItem('server')) {
        let local:any = localStorage.getItem('server');
        url = this.getServerUrl(local);
        
        if(url != '') {
          this.server = local;
          return url;
        }
        localStorage.removeItem('server');
      }
      
      let language = this.detectLanguage();
      url = this.getServerUrl(language);
      
      if(url != '') {
        this.server = language;
        return url;
      }
      else {
        this.server = 'dev';
        return environment.SERVER_DEV;
      }
    }
  }
  
  getServerUrl(server: string) {
    switch(server) {
      case 'dev':
        return 'https://dev.ellaswar.com';
      case 'en':
        return 'https://ellaswar.co.uk';
      case 'fr':
        return 'https://www.ellaswar.com';
      case 'next':
        return 'https://next.ellaswar.com';
    }
    return '';
  }
  
  getUrlServer(url:string) {
    switch(url) {
      case 'dev.ellaswar.com':
        return 'dev';
      case 'ellaswar.co.uk':
        return 'en';
      case 'www.ellaswar.com':
        return 'fr';
      case 'next.ellaswar.com':
        return 'next';
      
      default: return 'next';
    }
  }
  
  redirect(server: string) {
    window.location.href = this.getServerUrl(server);
  }
  
  /**
   * Language management
   **/
  detectLanguage() {
    let language:any = localStorage.getItem('language');
    
    if(!language || !environment.language.allowed.includes(language)) {
      language = this.detectBrowserLanguage();
    }
    
    return language;
  }
  
  detectServerLanguage() {
    if(this.server == 'fr' || this.server == 'next') {
      return 'fr';
    }
    return 'en';
  }
  
  saveLanguage(language:string) {
    localStorage.setItem('language', language);
  }
  
  detectBrowserLanguage() {
    let browserLanguage = navigator.language.split('-')[0];
    if(!environment.language.allowed.includes(browserLanguage)) {
      return environment.language.default;
    }
    return browserLanguage;
  }
}
