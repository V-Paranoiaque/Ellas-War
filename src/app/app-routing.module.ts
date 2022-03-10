import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

//Public
import { AuthComponent } from './public/ts/auth.component';
import { AllianceMembersComponent } from './public/ts/alliance-members.component';
import { AllianceProfileComponent } from './public/ts/alliance-profile.component';
import { CommunityComponent } from './public/ts/community.component';
import { ConfidentialityComponent } from './public/ts/confidentiality.component';
import { ConfirmComponent } from './public/ts/confirm.component';
import { ConnectedPlayersComponent } from './public/ts/connectedplayers.component';
import { ContactUsComponent } from './public/ts/contactus.component';
import { CreditsComponent } from './public/ts/credits.component';
import { DiscoverTheGameComponent } from './public/ts/discoverthegame.component';
import { FewWordsComponent } from './public/ts/fewwords.component';
import { FreeGameComponent } from './public/ts/free-game.component';
import { HelpComponent } from './public/ts/help.component';
import { HomeComponent } from './public/ts/home.component';
import { HonnorComponent } from './public/ts/honnor.component';
import { LoginComponent } from './public/ts/login.component';
import { LostPasswordComponent } from './public/ts/lostpassword.component';
import { NewsComponent } from './public/ts/news.component';
import { PartnersComponent } from './public/ts/partners.component';
import { PermalinkComponent } from './public/ts/permalink.component';
import { ProfileComponent } from './public/ts/profile.component';
import { RankingAlliancesComponent } from './public/ts/rankingalliances.component';
import { RankingPlayersComponent } from './public/ts/rankingplayers.component';
import { RegisterComponent } from './public/ts/register.component';
import { StrategyGameComponent } from './public/ts/strategy-game.component';
import { TAndCsComponent } from './public/ts/tandcs.component';
import { TeamComponent } from './public/ts/team.component';
import { TeamRecruitmentComponent } from './public/ts/teamrecruitment.component';
import { UnsubscribeComponent } from './public/ts/unsubscribe.component';

//Connected
import { AllianceComponent } from './private/ts/alliance.component';
import { AttacksComponent } from './private/ts/attacks.component';
import { CityComponent } from './private/ts/city.component';
import { DetailsComponent } from './private/ts/details.component';
import { DiplomacyComponent } from './private/ts/diplomacy.component';
import { FavorsComponent } from './private/ts/favors.component';
import { GetFavorsComponent } from './private/ts/getfavors.component';
import { MessagesComponent } from './private/ts/messages.component';
import { OptionsComponent } from './private/ts/options.component';
import { QuestsComponent } from './private/ts/quests.component';
import { StrategiesComponent } from './private/ts/strategies.component';
import { StoreroomComponent } from './private/ts/storeroom.component';
import { SupportComponent } from './private/ts/support.component';

//Blocked
import { BlockedComponent } from './private/ts/blocked.component';

//Paused
import { PausedComponent } from './private/ts/paused.component';

//Admin
import { Admin404Component } from './admin/ts/admin-404.component';
import { AdminActionsComponent } from './admin/ts/admin-actions.component';
import { AdminChatComponent } from './admin/ts/admin-chat.component';
import { AdminContactComponent } from './admin/ts/admin-contact.component';
import { AdminEmailsComponent } from './admin/ts/admin-emails.component';
import { AdminMessagesComponent } from './admin/ts/admin-messages.component';
import { AdminNewsComponent } from './admin/ts/admin-news.component';
import { AdminHomeComponent } from './admin/ts/admin-home.component';
import { AdminPausesComponent } from './admin/ts/admin-pauses.component';
import { AdminPermissionsComponent } from './admin/ts/admin-permissions.component';
import { AdminPlayersComponent } from './admin/ts/admin-players.component';
import { AdminPrayersComponent } from './admin/ts/admin-prayers.component';
import { AdminProfileComponent } from './admin/ts/admin-profile.component';
import { AdminQuestsComponent } from './admin/ts/admin-quests.component';
import { AdminResourcesComponent } from './admin/ts/admin-resources.component';
import { AdminStatsBuildingsComponent } from './admin/ts/admin-stats-buildings.component';
import { AdminStatsMintsComponent } from './admin/ts/admin-stats-mints.component';
import { AdminStatsQuestsComponent } from './admin/ts/admin-stats-quests.component';
import { AdminStatsUnitsComponent } from './admin/ts/admin-stats-units.component';
import { AdminStoreroomComponent } from './admin/ts/admin-storeroom.component';
import { AdminSupportComponent } from './admin/ts/admin-support.component';
import { AdminSupportMsgComponent } from './admin/ts/admin-support-msg.component';
import { AdminXpComponent } from './admin/ts/admin-xp.component';

//General
import { SiteMapComponent } from './public/ts/sitemap.component';
import { PageNotFoundComponent } from './public/ts/pagenotfound.component';

let routes: Routes = [];

routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'auth/:provider', component: AuthComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'confidentiality', component: ConfidentialityComponent },
  { path: 'confirm/:id/:check', component: ConfirmComponent },
  { path: 'connectedplayers', component: ConnectedPlayersComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'discoverthegame', component: DiscoverTheGameComponent },
  { path: 'discoverthegame/:page', component: DiscoverTheGameComponent },
  { path: 'fewwords', component: FewWordsComponent },
  { path: 'free-game', component: FreeGameComponent },
  { path: 'help', component: HelpComponent },
  { path: 'honnor', component: HonnorComponent },
  { path: 'honnor/:id', component: HonnorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lostpassword', component: LostPasswordComponent },
  { path: 'news', component: NewsComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'permalink', component: PermalinkComponent },
  { path: 'permalink/:id', component: PermalinkComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rankingalliances', component: RankingAlliancesComponent },
  { path: 'rankingalliances/:id', component: RankingAlliancesComponent },
  { path: 'rankingplayers', component: RankingPlayersComponent },
  { path: 'rankingplayers/:id', component: RankingPlayersComponent },
  { path: 'rankingplayers/:id/:order', component: RankingPlayersComponent },
  { path: 'strategy-game', component: StrategyGameComponent },
  { path: 'tandcs', component: TAndCsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'teamrecruitment', component: TeamRecruitmentComponent },
  { path: 'unsubscribe/:id/:check', component: UnsubscribeComponent },
  
  { path: 'sitemap', component: SiteMapComponent },
  
  { path: 'alliance', component: AllianceComponent },
  { path: 'alliancemembers/:id', component: AllianceMembersComponent },
  { path: 'allianceprofile/:id', component: AllianceProfileComponent },
  { path: 'attacks', component: AttacksComponent },
  { path: 'city', component: CityComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'diplomacy', component: DiplomacyComponent },
  { path: 'favors', component: FavorsComponent },
  { path: 'getfavors', component: GetFavorsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'quests', component: QuestsComponent },
  { path: 'strategies', component: StrategiesComponent },
  { path: 'strategies/:type', component: StrategiesComponent },
  { path: 'storeroom', component: StoreroomComponent },
  { path: 'support', component: SupportComponent },
  { path: 'support/:id', component: SupportComponent },
  { path: 'support/:id/:msg', component: SupportComponent },
  
  { path: 'blocked', component: BlockedComponent },
  
  { path: 'paused', component: PausedComponent },
  
  { path: 'admin',
    children: [
      { path: '404', component: Admin404Component },
      { path: 'actions', component: AdminActionsComponent },
      { path: 'chat', component: AdminChatComponent },
      { path: 'contact', component: AdminContactComponent },
      { path: 'contact/:id', component: AdminContactComponent },
      { path: 'emails', component: AdminEmailsComponent },
      { path: 'messages', component: AdminMessagesComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'news/:id', component: AdminNewsComponent },
      { path: 'pauses', component: AdminPausesComponent },
      { path: 'permissions', component: AdminPermissionsComponent },
      { path: 'players', component: AdminPlayersComponent },
      { path: 'prayers', component: AdminPrayersComponent },
      { path: 'profile/:id', component: AdminProfileComponent },
      { path: 'quests', component: AdminQuestsComponent },
      { path: 'resources', component: AdminResourcesComponent },
      { path: 'stats/buildings', component: AdminStatsBuildingsComponent },
      { path: 'stats/mints', component: AdminStatsMintsComponent },
      { path: 'stats/quests', component: AdminStatsQuestsComponent },
      { path: 'stats/units', component: AdminStatsUnitsComponent },
      { path: 'storeroom', component: AdminStoreroomComponent },
      { path: 'support', component: AdminSupportComponent },
      { path: 'support/:id', component: AdminSupportComponent },
      { path: 'support/:id/:msg', component: AdminSupportMsgComponent },
      { path: 'xp', component: AdminXpComponent },
      
      { path: '**', component: AdminHomeComponent }
    ]
  },
  
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
