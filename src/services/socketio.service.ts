import { Component, EventEmitter } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-socket',
  template: ` <ng-content></ng-content> `,
})
export class SocketComponent {
  public onChange: EventEmitter<object> = new EventEmitter<object>();

  socket: Socket | null = null;
  server: string;
  url: string;
  local: boolean;

  constructor() {
    if (window.location.port && window.location.port !== '443') {
      this.local = true;
    } else {
      this.local = false;
    }
    this.server = '';
    this.url = '';
  }

  setServer(server: string) {
    this.server = server;
    localStorage.setItem('server', server);

    //Setup the new connection
    this.setupSocketConnection(this.getServerUrl(server));

    //Reload the app
    this.onChange.emit({ action: 'appReload' });
  }

  setupSocketConnection(url: string) {
    //Close previous connection
    if (this.socket) {
      this.socket.close();
    }

    const ws = url.replace('https', 'wss');
    this.socket = io(ws);
    this.url = url;

    this.socket.on('connect', () => {
      this.loadUser();
    });
  }

  emit(socketName: string, data: number | object | string | null = null) {
    this.socket!.emit(socketName, data);
  }

  loadUser() {
    this.emit('loadConfig');
    this.emit('ewAuth', { token: localStorage.getItem('token') });
  }
  //number[] & string[] & object[] & number & string & object
  on(
    socketName: string,
    callback: (
      res: number[] & string[] & object[] & number & string & object
    ) => void
  ) {
    this.socket!.on(socketName, data => {
      callback(
        data as number[] & string[] & object[] & number & string & object
      );
    });
  }

  removeListener(socketName: string) {
    this.socket!.removeListener(socketName);
  }

  /**
   * Server management
   **/
  detectServer() {
    if (environment.mobile === 0) {
      //Local
      if (this.local) {
        this.server = 'dev';
        return environment.SERVER_DEV;
      } else {
        const url = window.location.hostname;
        this.server = this.getUrlServer(url);
        return 'https://' + url;
      }
    } else {
      let url;
      if (localStorage.getItem('server')) {
        const local: string = localStorage.getItem('server') ?? '';
        url = this.getServerUrl(local);

        if (url !== '') {
          this.server = local;
          return url;
        }
        localStorage.removeItem('server');
      }

      const language = SocketComponent.detectLanguage();
      url = this.getServerUrl(language);

      if (url !== '') {
        this.server = language;
        return url;
      } else {
        this.server = 'dev';
        return environment.SERVER_DEV;
      }
    }
  }

  getServerUrl(server: string) {
    switch (server) {
      case 'dev':
      case 'next':
        return 'https://dev.ellaswar.com';
      case 'en':
        return 'https://ellaswar.co.uk';
      case 'fr':
        return 'https://www.ellaswar.com';
    }
    return '';
  }

  getUrlServer(url: string) {
    switch (url) {
      case 'dev.ellaswar.com':
      case 'next.ellaswar.com':
        return 'dev';
      case 'ellaswar.co.uk':
        return 'en';
      case 'www.ellaswar.com':
        return 'fr';

      default:
        return 'dev';
    }
  }

  redirect(server: string) {
    window.location.href = this.getServerUrl(server);
  }

  /**
   * Language management
   **/
  static detectLanguage() {
    let language: string = localStorage.getItem('language') ?? '';

    if (!language || !environment.language.allowed.includes(language)) {
      language = SocketComponent.detectBrowserLanguage(navigator.languages);
    }

    return language;
  }

  detectServerLanguage() {
    if (this.server === 'fr') {
      return 'fr';
    }
    return 'en';
  }

  static saveLanguage(language: string) {
    localStorage.setItem('language', language);
  }

  static detectBrowserLanguage(languages: readonly string[]) {
    for (const language of languages) {
      const browserLanguage = language.split('-')[0];
      if (environment.language.allowed.includes(browserLanguage)) {
        return browserLanguage;
      }
    }
    return environment.language.default;
  }
}
