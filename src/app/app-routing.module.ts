import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Public
import { AllianceMembers } from './public/ts/alliance-members.component';
import { AllianceProfile } from './public/ts/alliance-profile.component';
import { Community } from './public/ts/community.component';
import { Confidentiality } from './public/ts/confidentiality.component';
import { ConnectedPlayers } from './public/ts/connectedplayers.component';
import { ContactUs } from './public/ts/contactus.component';
import { Credits } from './public/ts/credits.component';
import { DiscoverTheGame } from './public/ts/discoverthegame.component';
import { FewWords } from './public/ts/fewwords.component';
import { FreeGame } from './public/ts/free-game.component';
import { Help } from './public/ts/help.component';
import { Honnor } from './public/ts/honnor.component';
import { Login } from './public/ts/login.component';
import { LostPassword } from './public/ts/lostpassword.component';
import { News } from './public/ts/news.component';
import { Partners } from './public/ts/partners.component';
import { Profile } from './public/ts/profile.component';
import { PublicHome } from './public/ts/public-home.component';
import { RankingAlliances } from './public/ts/rankingalliances.component';
import { RankingPlayers } from './public/ts/rankingplayers.component';
import { Register } from './public/ts/register.component';
import { StrategyGame } from './public/ts/strategy-game.component';
import { TAndCs } from './public/ts/tandcs.component';
import { Team } from './public/ts/team.component';
import { TeamRecruitment } from './public/ts/teamrecruitment.component';

//Connected
import { Alliance } from './private/ts/alliance.component';
import { Attacks } from './private/ts/attacks.component';
import { City } from './private/ts/city.component';
import { Details } from './private/ts/details.component';
import { Diplomacy } from './private/ts/diplomacy.component';
import { Favors } from './private/ts/favors.component';
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
import { AdminChat } from './admin/ts/admin-chat.component';
import { AdminContact } from './admin/ts/admin-contact.component';
import { AdminEmails } from './admin/ts/admin-emails.component';
import { AdminMessages } from './admin/ts/admin-messages.component';
import { AdminNews } from './admin/ts/admin-news.component';
import { AdminHome } from './admin/ts/admin-home.component';
import { AdminPauses } from './admin/ts/admin-pauses.component';
import { AdminPermissions } from './admin/ts/admin-permissions.component';
import { AdminPlayers } from './admin/ts/admin-players.component';
import { AdminPrayers } from './admin/ts/admin-prayers.component';
import { AdminQuests } from './admin/ts/admin-quests.component';
import { AdminResources } from './admin/ts/admin-resources.component';
import { AdminStoreroom } from './admin/ts/admin-storeroom.component';
import { AdminSupport } from './admin/ts/admin-support.component';
import { AdminUnits } from './admin/ts/admin-units.component';

//General
import { SiteMap } from './public/ts/sitemap.component';
import { PageNotFound } from './public/ts/pagenotfound.component';

let routes: Routes = [];

routes = [
  { path: 'community', component: Community },
  { path: 'confidentiality', component: Confidentiality },
  { path: 'connectedplayers', component: ConnectedPlayers },
  { path: 'contactus', component: ContactUs },
  { path: 'credits', component: Credits },
  { path: 'discoverthegame', component: DiscoverTheGame },
  { path: 'fewwords', component: FewWords },
  { path: 'free-game', component: FreeGame },
  { path: 'help', component: Help },
  { path: 'honnor', component: Honnor },
  { path: 'honnor/:id', component: Honnor },
  { path: 'login', component: Login },
  { path: 'lostpassword', component: LostPassword },
  { path: 'news', component: News },
  { path: 'partners', component: Partners },
  { path: 'profile/:id', component: Profile },
  { path: 'register', component: Register },
  { path: 'rankingalliances', component: RankingAlliances },
  { path: 'rankingalliances/:id', component: RankingAlliances },
  { path: 'rankingplayers', component: RankingPlayers },
  { path: 'rankingplayers/:id', component: RankingPlayers },
  { path: 'rankingplayers/:id/:order', component: RankingPlayers },
  { path: 'strategy-game', component: StrategyGame },
  { path: 'tandcs', component: TAndCs },
  { path: 'team', component: Team },
  { path: 'teamrecruitment', component: TeamRecruitment },
  
  { path: 'sitemap', component: SiteMap },
  
  { path: 'alliance', component: Alliance },
  { path: 'alliancemembers/:id', component: AllianceMembers },
  { path: 'allianceprofile/:id', component: AllianceProfile },
  { path: 'attacks', component: Attacks },
  { path: 'city', component: City },
  { path: 'details', component: Details },
  { path: 'diplomacy', component: Diplomacy },
  { path: 'favors', component: Favors },
  { path: 'messages', component: Messages },
  { path: 'options', component: Options },
  { path: 'quests', component: Quests },
  { path: 'storeroom', component: Storeroom },
  { path: 'support', component: Support },
  { path: 'support/:id', component: Support },
  
  { path: 'blocked', component: Blocked },
  
  { path: 'paused', component: Paused },
  
  { path: 'admin',
    children: [
      { path: 'chat', component: AdminChat },
      { path: 'contact', component: AdminContact },
      { path: 'emails', component: AdminEmails },
      { path: 'messages', component: AdminMessages },
      { path: 'news', component: AdminNews },
      { path: 'pauses', component: AdminPauses },
      { path: 'permissions', component: AdminPermissions },
      { path: 'players', component: AdminPlayers },
      { path: 'prayers', component: AdminPrayers },
      { path: 'quests', component: AdminQuests },
      { path: 'resources', component: AdminResources },
      { path: 'storeroom', component: AdminStoreroom },
      { path: 'support', component: AdminSupport },
      { path: 'units', component: AdminUnits },
      { path: '**', component: AdminHome }
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
