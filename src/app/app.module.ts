import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MainIncludeComponent } from './main/main-include.component';
import { Page404Component } from './page404/page404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OAuthModule } from 'angular-oauth2-oidc';
import {
  HttpClient,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from '../services/ic-icon.service';
import { ClipboardModule } from 'ngx-clipboard';
import { SocketComponent as Socket } from '../services/socketio.service';
import { ToolsComponent as Tools } from '../services/tools.service';
import { UserComponent as User } from '../services/user.service';

import { MainPublicIncludeComponent } from './main-public/main-public-include.component';
import { MainPrivateIncludeComponent } from './main-private/main-private-include.component';
import { SupportComponent } from './support/support.component';
import { OptionsIncludeComponent } from './options/options-include.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { CommunityComponent } from './community/community.component';
import { ConfidentialityComponent } from './confidentiality/confidentiality.component';
import { DiscoverthegameIncludeComponent } from './discoverthegame/discoverthegame-include.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { AdminIncludeComponent } from './admin/admin-include.component';
import { AttacksIncludeComponent } from './attacks/attacks-include.component';
import { MessagesIncludeComponent } from './messages/messages-include.component';
import { QuestsIncludeComponent } from './quests/quests-include.component';
import { StoreroomIncludeComponent } from './storeroom/storeroom-include.component';
import { AllianceIncludeComponent } from './alliance/alliance-include.component';
import { AltarsIncludeComponent } from './altars/altars-include.component';
import { DetailsComponent } from './details/details.component';
import { DiplomacyIncludeComponent } from './diplomacy/diplomacy-include.component';
import { MintsComponent } from './mints/mints.component';
import { SponsorshipComponent } from './sponsorship/sponsorship.component';
import { StrategiesIncludeComponent } from './strategies/strategies-include.component';
import { GetfavorsComponent } from './getfavors/getfavors.component';
import { SanctuaryIncludeComponent } from './sanctuary/sanctuary-include.component';
import { AgoraIncludeComponent } from './agora/agora-include.component';
import { CityIncludeComponent } from './city/city-include.component';
import { RankingplayersIncludeComponent } from './rankingplayers/rankingplayers-include.component';
import { HonnorIncludeComponent } from './honnor/honnor-include.component';
import { RankingalliancesComponent } from './rankingalliances/rankingalliances.component';
import { ConnectedplayersComponent } from './connectedplayers/connectedplayers.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CreditsComponent } from './credits/credits.component';
import { FewwordsComponent } from './fewwords/fewwords.component';
import { FreeGameComponent } from './free-game/free-game.component';
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
import { ProfileComponent } from './profile/profile.component';
import { AlliancemembersComponent } from './alliancemembers/alliancemembers.component';
import { AllianceprofileComponent } from './allianceprofile/allianceprofile.component';
import { HelpComponent } from './help/help.component';
import { BlockedComponent } from './blocked/blocked.component';
import { PausedComponent } from './paused/paused.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminPage404Component } from './admin-page404/admin-page404.component';
import { AdminSupportIncludeComponent } from './admin-support/admin-support-include.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminPermissionsComponent } from './admin-permissions/admin-permissions.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminWarsComponent } from './admin-wars/admin-wars.component';
import { AdminQuestsIncludeComponent } from './admin-quests/admin-quests-include.component';
import { AdminStoreroomComponent } from './admin-storeroom/admin-storeroom.component';
import { AdminAgoraComponent } from './admin-agora/admin-agora.component';
import { AdminPausesComponent } from './admin-pauses/admin-pauses.component';
import { AdminEmailsComponent } from './admin-emails/admin-emails.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminPrayersComponent } from './admin-prayers/admin-prayers.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminAimageComponent } from './admin-aimage/admin-aimage.component';
import { AdminPimageComponent } from './admin-pimage/admin-pimage.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { AdminDuplicateemailComponent } from './admin-duplicateemail/admin-duplicateemail.component';
import { AdminDuplicateipComponent } from './admin-duplicateip/admin-duplicateip.component';
import { AdminSuspiciousipComponent } from './admin-suspiciousip/admin-suspiciousip.component';
import { AdminIpComponent } from './admin-ip/admin-ip.component';
import { AdminPasswordtryComponent } from './admin-passwordtry/admin-passwordtry.component';
import { AdminSeoIncludeComponent } from './admin-seo/admin-seo-include.component';
import { AdminAlliancesComponent } from './admin-alliances/admin-alliances.component';

@NgModule({
  declarations: [
    AppComponent,
    EwIconSubComponent,
    IcIconComponent,

    CommunityComponent,
    ConfidentialityComponent,
    ContactComponent,
    DiscoverthegameIncludeComponent,
    HelpComponent,
    MainIncludeComponent,
    Page404Component,
    SitemapComponent,

    AuthComponent,
    MainPublicIncludeComponent,

    AgoraIncludeComponent,
    AltarsIncludeComponent,
    AllianceIncludeComponent,
    AttacksIncludeComponent,
    CityIncludeComponent,
    DetailsComponent,
    DiplomacyIncludeComponent,
    GetfavorsComponent,
    MainPrivateIncludeComponent,
    MessagesIncludeComponent,
    MintsComponent,
    OptionsIncludeComponent,
    QuestsIncludeComponent,
    SanctuaryIncludeComponent,
    SponsorshipComponent,
    StrategiesIncludeComponent,
    StoreroomIncludeComponent,
    SupportComponent,

    AdminIncludeComponent,
    RankingplayersIncludeComponent,
    HonnorIncludeComponent,
    RankingalliancesComponent,
    ConnectedplayersComponent,
    ConfirmComponent,
    ContactusComponent,
    CreditsComponent,
    FewwordsComponent,
    FreeGameComponent,
    LoginComponent,
    LostpasswordComponent,
    NewsComponent,
    PartnersComponent,
    PermalinkComponent,
    RegisterComponent,
    StrategyGameComponent,
    TandcsComponent,
    TeamComponent,
    TeamrecruitmentComponent,
    UnsubscribeComponent,
    ProfileComponent,
    AlliancemembersComponent,
    AllianceprofileComponent,
    BlockedComponent,
    PausedComponent,
    StatisticsComponent,
    AdminAlliancesComponent,
    AdminPage404Component,
    AdminSupportIncludeComponent,
    AdminContactComponent,
    AdminActionsComponent,
    AdminPermissionsComponent,
    AdminChatComponent,
    AdminWarsComponent,
    AdminQuestsIncludeComponent,
    AdminStoreroomComponent,
    AdminAgoraComponent,
    AdminPausesComponent,
    AdminEmailsComponent,
    AdminNewsComponent,
    AdminResourcesComponent,
    AdminPrayersComponent,
    AdminMessagesComponent,
    AdminPlayersComponent,
    AdminProfileComponent,
    AdminAimageComponent,
    AdminPimageComponent,
    AdminHistoryComponent,
    AdminDuplicateemailComponent,
    AdminDuplicateipComponent,
    AdminSuspiciousipComponent,
    AdminIpComponent,
    AdminPasswordtryComponent,
    AdminSeoIncludeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClipboardModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    OAuthModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [TranslateStore, Socket, User, Tools],
  bootstrap: [AppComponent],
})
export class AppModule {}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
