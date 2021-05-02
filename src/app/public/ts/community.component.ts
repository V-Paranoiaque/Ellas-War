import { Component } from '@angular/core';
import { User } from '../../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  templateUrl: '../html/community.component.html'
})

export class Community {
  facebookIcon  = facebookIcon;
  githubOctocat = githubOctocat;
  
  constructor(public user: User) {
    
  }
}
