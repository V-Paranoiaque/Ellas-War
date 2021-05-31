import { io } from 'socket.io-client';
import { environment } from './../environments/environment';

export class Socket {
  socket: any;
  server: string;
  local: boolean;
  
  constructor() {
    if(window.location.port != '443') {
      this.local = true;
    }
    else {
      this.local = false;
    }
    this.server = '';
  }
  
  setupSocketConnection(server:string) {
    this.socket = io(server);
    
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
        this.server = 'next';
        return environment.SOCKET_ENDPOINT;
      }
      else {
        return window.origin;
      }
    }
    else {
      let server;
      if(localStorage.getItem('server')) {
        let local:any = localStorage.getItem('server');
        server = this.getServer(local);
        
        if(server != '') {
          this.server = server;
          return server;
        }
        localStorage.removeItem('server');
      }
      
      let language = this.detectLanguage();
      server = this.getServer(language);
      
      if(server != '') {
        localStorage.setItem('server', server);
        this.server = server;
        return server;
      }
      else {
        this.server = 'next';
        return environment.SOCKET_ENDPOINT;
      }
    }
  }
  
  getServer(server: string) {
    switch(server) {
      case 'fr':
        return 'https://www.ellaswar.com';
      case 'en':
        return 'https://ellaswar.co.uk';
      case 'next':
        return 'https://next.ellaswar.com';
    }
    return '';
  }
  
  redirect(server: string) {
    window.location.href = this.getServer(server);
  }
  
  /**
   * Language management
   **/
  detectLanguage() {
    let language:any = localStorage.getItem('language');
    
    if(!language || !environment.language.allowed.includes(language)) {
      language = this.detectBrowserLanguage();
    }
    
    localStorage.setItem('language', language);
    
    return language;
  }
  
  detectBrowserLanguage() {
    let browserLanguage = navigator.language.split('-')[0];
    if(!environment.language.allowed.includes(browserLanguage)) {
      return environment.language.default;
    }
    return browserLanguage;
  }
}
