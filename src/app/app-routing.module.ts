import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Public
import { Credits } from './public/ts/credits.component';
import { DiscoverTheGame } from './public/ts/discoverthegame.component';
import { Login } from './public/ts/login.component';
import { News } from './public/ts/news.component';
import { Profile } from './public/ts/profile.component';
import { PublicHome } from './public/ts/public-home.component';
import { Register } from './public/ts/register.component';

//Connected
import { Alliance } from './private/ts/alliance.component';
import { Attacks } from './private/ts/attacks.component';
import { City } from './private/ts/city.component';
import { Details } from './private/ts/details.component';
import { Messages } from './private/ts/messages.component';
import { Options } from './private/ts/options.component';
import { Quests } from './private/ts/quests.component';
import { Storeroom } from './private/ts/storeroom.component';
import { Support } from './private/ts/support.component';

//Blocked
import { Blocked } from './private/ts/blocked.component';

//Paused
import { Paused } from './private/ts/paused.component';

//Admin
import { AdminUnits } from './admin/ts/admin-units.component';

//General
import { SiteMap } from './public/ts/sitemap.component';
import { PageNotFound } from './public/ts/pagenotfound.component';

let routes: Routes = [];

routes = [
  { path: 'credits', component: Credits },
  { path: 'discoverthegame', component: DiscoverTheGame },
  { path: 'login', component: Login },
  { path: 'news', component: News },
  { path: 'profile/:id', component: Profile },
  { path: 'register', component: Register },
  
  { path: 'sitemap', component: SiteMap },
  
  { path: 'alliance', component: Alliance },
  { path: 'attacks', component: Attacks },
  { path: 'city', component: City },
  { path: 'details', component: Details },
  { path: 'messages', component: Messages },
  { path: 'options', component: Options },
  { path: 'quests', component: Quests },
  { path: 'storeroom', component: Storeroom },
  { path: 'support', component: Support },
  
  { path: 'blocked', component: Blocked },
  
  { path: 'paused', component: Paused },
  
  { path: 'admin',
    children: [
      {
        path: 'units',
        component: AdminUnits
      }
    ]
  },
    
  { path: '', component: PublicHome },
  { path: '**', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
