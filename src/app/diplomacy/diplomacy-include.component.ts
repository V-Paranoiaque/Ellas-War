import { DiplomacyComponent } from './diplomacy.component';

import { DiplomacyAllianceCreatePopupSubComponent } from './diplomacy-alliance-create-popup.sub-component';
import { DiplomacyInvasionHelpPopupSubComponent } from './diplomacy-invasion-help-popup.sub-component';
import { DiplomacyAllianceJoinPopupSubComponent } from './diplomacy-alliance-join-popup.sub-component';
import { DiplomacyPactAskPopupSubComponent } from './diplomacy-pact-ask-popup.sub-component';
import { DiplomacyWarDeclarePopupSubComponent } from './diplomacy-war-declare-popup.sub-component';
import { DiplomacyAllianceHelpPopupSubComponent } from './diplomacy-alliance-help-popup.sub-component';

export const DiplomacyIncludeComponent = [
  DiplomacyComponent,

  DiplomacyAllianceCreatePopupSubComponent,
  DiplomacyInvasionHelpPopupSubComponent,
  DiplomacyAllianceJoinPopupSubComponent,
  DiplomacyAllianceHelpPopupSubComponent,
  DiplomacyPactAskPopupSubComponent,
  DiplomacyWarDeclarePopupSubComponent,
];
