import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  templateUrl: '../html/profile.component.html'
})

export class Profile {
  id: any;
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
  }
};
