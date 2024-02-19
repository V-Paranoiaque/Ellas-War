import { SocketComponent } from './socketio.service';
import { environment } from './../environments/environment';

describe('SocketComponent', () => {
  it('SocketComponent', () => {
    expect(SocketComponent).toBeTruthy();
  });

  it('detectBrowserLanguage', () => {
    expect(SocketComponent.detectLanguage()).toBeTruthy();
    SocketComponent.saveLanguage('en');
    expect(SocketComponent.detectLanguage()).toEqual('en');
    SocketComponent.saveLanguage('pt');
    expect(SocketComponent.detectLanguage()).toBeTruthy();
    SocketComponent.saveLanguage('');
    expect(SocketComponent.detectLanguage()).toBeTruthy();
  });

  it('detectBrowserLanguage', () => {
    expect(SocketComponent.detectBrowserLanguage(['dummy'])).toEqual(
      environment.language.default
    );
    expect(
      SocketComponent.detectBrowserLanguage(['fr', 'en', 'en-US'])
    ).toEqual('fr');
    expect(
      SocketComponent.detectBrowserLanguage(['es', 'en', 'en-US'])
    ).toEqual('en');
  });
});
