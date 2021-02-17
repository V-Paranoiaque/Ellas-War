import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Public
import { DiscoverTheGame } from './public/ts/discoverthegame.component';
import { Login } from './public/ts/login.component';
import { News } from './public/ts/news.component';
import { PublicHome } from './public/ts/public-home.component';
import { Register } from './public/ts/register.component';

//Connected
import { Attacks } from './private/ts/attacks.component';
import { City } from './private/ts/city.component';
import { Messages } from './private/ts/messages.component';
import { Options } from './private/ts/options.component';
import { Quests } from './private/ts/quests.component';
import { Storeroom } from './private/ts/storeroom.component';

//General
import { SiteMap } from './public/ts/sitemap.component';
import { PageNotFound } from './public/ts/pagenotfound.component';

let routes: Routes = [];

routes = [
  { path: 'discoverthegame', component: DiscoverTheGame },
  { path: 'login', component: Login },
  { path: 'news', component: News },
  { path: 'register', component: Register },
  
  { path: 'sitemap', component: SiteMap },
  
  { path: 'attacks', component: Attacks },
  { path: 'city', component: City },
  { path: 'messages', component: Messages },
  { path: 'options', component: Options },
  { path: 'quests', component: Quests },
  { path: 'storeroom', component: Storeroom },
  
  { path: '', component: PublicHome },
  { path: '**', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
