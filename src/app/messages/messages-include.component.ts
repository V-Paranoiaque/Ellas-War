import { MessagesComponent } from './messages.component';

import { MessagesContentSubComponent } from './messages-content.sub-component';
import { MessagesPopupSubComponent } from './messages-popup.sub-component';
import { MessagesTitleSubComponent } from './messages-title.sub-component';

export const MessagesIncludeComponent = [
  MessagesComponent,

  MessagesContentSubComponent,
  MessagesPopupSubComponent,
  MessagesTitleSubComponent,
];
