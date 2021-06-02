import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: '../html/lostpassword.component.html'
})

export class LostPassword {
  public lostpasswordError:number;
  public lostvalue:string;
  
  constructor(private http: HttpClient, private titleService: Title,
              public translate: TranslateService) {
    this.lostpasswordError = 0;
    this.lostvalue = '';
  }
  
  ngOnInit() {
    this.translate.get('Forgot your password').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  lostpassword() {
    if(!this.lostvalue) {
      this.lostpasswordError = 4;
      return;
    }
    
    let url:string;
    url = environment.SOCKET_ENDPOINT+'/api/lostpassword/'+encodeURIComponent(this.lostvalue)+'.json';
    
    this.http.get(url).subscribe((result:any) => {
      if(result) {
        this.lostpasswordError = result.error;
      }
      else {
        this.lostpasswordError = 0;
      }
    });
  }
}
