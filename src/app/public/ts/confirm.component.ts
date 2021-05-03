import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/confirm.component.html'
})

export class Confirm {
  public confirmResult:number;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.confirmResult = 0;
  }
  
  ngOnInit() {
    let id:any   = this.route.snapshot.paramMap.get('id');
    let check:any = this.route.snapshot.paramMap.get('check');
    
    let url:string;
    
    url = environment.SOCKET_ENDPOINT+'/api/confirmcheck/'+
          encodeURIComponent(id)+'/'+
          encodeURIComponent(check)+'.json';
    
    this.http.get(url).subscribe((result:any) => {
      this.confirmResult = result.error;
    });
  }
}
