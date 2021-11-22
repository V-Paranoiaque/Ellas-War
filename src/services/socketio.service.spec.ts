import { TestBed } from '@angular/core/testing';

import { SocketComponent as Socket } from './/socketio.service';

describe('Socket', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Socket,
      ],
      imports: [
      ],
      providers: [
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(Socket);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it(`test getServerUrl`, () => {
    const fixture = TestBed.createComponent(Socket);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    expect(app.getServerUrl('default')).toEqual('');
    
    expect(app.getServerUrl('dev')).toEqual('https://dev.ellaswar.com');
    expect(app.getServerUrl('next')).toEqual('https://dev.ellaswar.com');
    expect(app.getServerUrl('fr')).toEqual('https://www.ellaswar.com');
    expect(app.getServerUrl('en')).toEqual('https://ellaswar.co.uk');
  });
  
  it(`test getUrlServer`, () => {
    const fixture = TestBed.createComponent(Socket);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    expect(app.getUrlServer('default')).toEqual('dev');
    
    expect(app.getUrlServer('dev.ellaswar.com')).toEqual('dev');
    expect(app.getUrlServer('next.ellaswar.com')).toEqual('dev');
    expect(app.getUrlServer('www.ellaswar.com')).toEqual('fr');
    expect(app.getUrlServer('ellaswar.co.uk')).toEqual('en');
  });
  
  it(`test detectServerLanguage`, () => {
    const fixture = TestBed.createComponent(Socket);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.server = 'fr';
    
    expect(app.detectServerLanguage()).toEqual('fr');
  });
  
  
  
});
