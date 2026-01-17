import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { CommunityComponent } from './community/community.component';
import { ConfidentialityComponent } from './confidentiality/confidentiality.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConnectedplayersComponent } from './connectedplayers/connectedplayers.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CreditsComponent } from './credits/credits.component';
import { DeleteAccountComponent } from './deleteaccount/deleteaccount.component';
import { DiscoverthegameComponent } from './discoverthegame/discoverthegame.component';
import { FewwordsComponent } from './fewwords/fewwords.component';
import { FreeGameComponent } from './free-game/free-game.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { LostpasswordComponent } from './lostpassword/lostpassword.component';
import { NewsComponent } from './news/news.component';
import { PartnersComponent } from './partners/partners.component';
import { PermalinkComponent } from './permalink/permalink.component';
import { RegisterComponent } from './register/register.component';
import { StrategyGameComponent } from './strategy-game/strategy-game.component';
import { TandcsComponent } from './tandcs/tandcs.component';
import { TeamComponent } from './team/team.component';
import { TeamrecruitmentComponent } from './teamrecruitment/teamrecruitment.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';

import { GetfavorsComponent } from './getfavors/getfavors.component';

import { AgoraComponent } from './agora/agora.component';
import { AllianceComponent } from './alliance/alliance.component';
import { AltarsComponent } from './altars/altars.component';
import { AttacksComponent } from './attacks/attacks.component';
import { AttacksDiamondComponent } from './attacks/attacks-diamond.component';
import { AttacksSanctuariesComponent } from './attacks/attacks-sanctuaries.component';
import { AttacksSeabattlesComponent } from './attacks/attacks-seabattles.component';
import { AttacksStatsComponent } from './attacks/attacks-stats.component';
import { AttacksWarComponent } from './attacks/attacks-war.component';
import { CityComponent } from './city/city.component';
import { DetailsComponent } from './details/details.component';
import { DiplomacyComponent } from './diplomacy/diplomacy.component';
import { MessagesComponent } from './messages/messages.component';
import { MintsComponent } from './mints/mints.component';
import { OptionsComponent } from './options/options.component';
import { QuestsComponent } from './quests/quests.component';
import { SponsorshipComponent } from './sponsorship/sponsorship.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { StoreroomComponent } from './storeroom/storeroom.component';
import { SupportComponent } from './support/support.component';

import { AdminComponent } from './admin/admin.component';

import { AlliancemembersComponent } from './alliancemembers/alliancemembers.component';
import { AllianceprofileComponent } from './allianceprofile/allianceprofile.component';
import { HonorComponent } from './honor/honor.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingalliancesComponent } from './rankingalliances/rankingalliances.component';
import { RankingplayersComponent } from './rankingplayers/rankingplayers.component';
import { RankingseabattlesComponent } from './rankingseabattles/rankingseabattles.component';

import { SitemapComponent } from './sitemap/sitemap.component';
import { MainComponent } from './main/main.component';
import { Page404Component } from './page404/page404.component';
import { AdminPage404Component } from './admin-page404/admin-page404.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminSupportComponent } from './admin-support/admin-support.component';
import { AdminPermissionsComponent } from './admin-permissions/admin-permissions.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminWarsComponent } from './admin-wars/admin-wars.component';
import { AdminSupportMsgComponent } from './admin-support/admin-support-msg.component';
import { AdminQuestsComponent } from './admin-quests/admin-quests.component';
import { AdminPausesComponent } from './admin-pauses/admin-pauses.component';
import { AdminEmailsComponent } from './admin-emails/admin-emails.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminPrayersComponent } from './admin-prayers/admin-prayers.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { AdminStoreroomComponent } from './admin-storeroom/admin-storeroom.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminAgoraComponent } from './admin-agora/admin-agora.component';
import { AdminAimageComponent } from './admin-aimage/admin-aimage.component';
import { AdminPimageComponent } from './admin-pimage/admin-pimage.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { AdminDuplicateemailComponent } from './admin-duplicateemail/admin-duplicateemail.component';
import { AdminDuplicateipComponent } from './admin-duplicateip/admin-duplicateip.component';
import { AdminSuspiciousipComponent } from './admin-suspiciousip/admin-suspiciousip.component';
import { AdminIpComponent } from './admin-ip/admin-ip.component';
import { AdminPasswordtryComponent } from './admin-passwordtry/admin-passwordtry.component';
import { AdminSeoComponent } from './admin-seo/admin-seo.component';
import { AdminAlliancesComponent } from './admin-alliances/admin-alliances.component';

export const routes: Routes = [
  // Public
  { path: 'auth', component: AuthComponent },
  { path: 'auth/:provider', component: AuthComponent },
  { path: 'confirm/:id/:check', component: ConfirmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lostpassword', component: LostpasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'unsubscribe/:id', component: UnsubscribeComponent },
  { path: 'unsubscribe/:id/:check', component: UnsubscribeComponent },

  // All
  { path: 'alliancemembers/:id', component: AlliancemembersComponent },
  { path: 'allianceprofile/:id', component: AllianceprofileComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'confidentiality', component: ConfidentialityComponent },
  { path: 'connectedplayers', component: ConnectedplayersComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'deleteaccount', component: DeleteAccountComponent },
  { path: 'discoverthegame', component: DiscoverthegameComponent },
  { path: 'discoverthegame/:page', component: DiscoverthegameComponent },
  { path: 'fewwords', component: FewwordsComponent },
  { path: 'free-game', component: FreeGameComponent },
  { path: 'help', component: HelpComponent },
  { path: 'honor', component: HonorComponent },
  { path: 'honor/:id', component: HonorComponent },
  { path: 'news', component: NewsComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'permalink', component: PermalinkComponent },
  { path: 'permalink/:id', component: PermalinkComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'rankingalliances', component: RankingalliancesComponent },
  { path: 'rankingalliances/:id', component: RankingalliancesComponent },
  { path: 'rankingalliances/:id/:order', component: RankingalliancesComponent },
  { path: 'rankingplayers', component: RankingplayersComponent },
  { path: 'rankingplayers/:id', component: RankingplayersComponent },
  { path: 'rankingplayers/:id/:order', component: RankingplayersComponent },
  { path: 'rankingseabattles', component: RankingseabattlesComponent },
  { path: 'rankingseabattles/:id', component: RankingseabattlesComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'strategy-game', component: StrategyGameComponent },
  { path: 'tandcs', component: TandcsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'teamrecruitment', component: TeamrecruitmentComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },

  // Connected all
  { path: 'getfavors', component: GetfavorsComponent },

  // Connected
  { path: 'agora', component: AgoraComponent },
  { path: 'alliance', component: AllianceComponent },
  { path: 'altars', component: AltarsComponent },
  { path: 'attacks', component: AttacksComponent },
  { path: 'attacks-diamond', component: AttacksDiamondComponent },
  { path: 'attacks-sanctuaries', component: AttacksSanctuariesComponent },
  { path: 'attacks-seabattles', component: AttacksSeabattlesComponent },
  { path: 'attacks-stats', component: AttacksStatsComponent },
  { path: 'attacks-war', component: AttacksWarComponent },
  { path: 'city', component: CityComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'diplomacy', component: DiplomacyComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'mints', component: MintsComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'quests', component: QuestsComponent },
  { path: 'sponsorship', component: SponsorshipComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'strategies', component: StrategiesComponent },
  { path: 'strategies/:type', component: StrategiesComponent },
  { path: 'storeroom', component: StoreroomComponent },
  { path: 'support', component: SupportComponent },
  { path: 'support/:id', component: SupportComponent },
  { path: 'support/:id/:msg', component: SupportComponent },

  // Admin
  {
    path: 'admin',
    children: [
      { path: 'actions', component: AdminActionsComponent },
      { path: 'agora', component: AdminAgoraComponent },
      { path: 'aimage', component: AdminAimageComponent },
      { path: 'alliances', component: AdminAlliancesComponent },
      { path: 'chat', component: AdminChatComponent },
      { path: 'contact', component: AdminContactComponent },
      { path: 'contact/:id', component: AdminContactComponent },
      { path: 'emails', component: AdminEmailsComponent },
      { path: 'duplicateemail', component: AdminDuplicateemailComponent },
      { path: 'duplicateip', component: AdminDuplicateipComponent },
      { path: 'history', component: AdminHistoryComponent },
      { path: 'ip', component: AdminIpComponent },
      { path: 'ip/:ip', component: AdminIpComponent },
      { path: 'messages', component: AdminMessagesComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'news/:id', component: AdminNewsComponent },
      { path: 'page404', component: AdminPage404Component },
      { path: 'passwordtry', component: AdminPasswordtryComponent },
      { path: 'pauses', component: AdminPausesComponent },
      { path: 'permissions', component: AdminPermissionsComponent },
      { path: 'pimage', component: AdminPimageComponent },
      { path: 'players', component: AdminPlayersComponent },
      { path: 'prayers', component: AdminPrayersComponent },
      { path: 'profile/:id', component: AdminProfileComponent },
      { path: 'quests', component: AdminQuestsComponent },
      { path: 'resources', component: AdminResourcesComponent },
      { path: 'seo', component: AdminSeoComponent },
      { path: 'storeroom', component: AdminStoreroomComponent },
      { path: 'support', component: AdminSupportComponent },
      { path: 'support/:id', component: AdminSupportComponent },
      { path: 'support/:id/:msg', component: AdminSupportMsgComponent },
      { path: 'suspiciousip', component: AdminSuspiciousipComponent },
      { path: 'wars', component: AdminWarsComponent },

      { path: '**', component: AdminComponent },
    ],
  },

  // Others
  { path: '', component: MainComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
