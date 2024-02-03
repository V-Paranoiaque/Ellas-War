import { MainComponent } from './main.component';

import { MainLeftSubComponent } from './main-left.sub-component';
import { MainRightSubComponent } from './main-right.sub-component';
import { UserProfileSubComponent } from './main-user-profile.sub-component';

export const MainIncludeComponent = [
  MainComponent,

  MainLeftSubComponent,
  MainRightSubComponent,
  UserProfileSubComponent,
];
