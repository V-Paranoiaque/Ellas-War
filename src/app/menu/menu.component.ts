import { PublicBottomBarComponent } from './ts/public-bottom-bar.component';
import { CommonBottomBarComponent } from './ts/common-bottom-bar.component';
import { CommonTopBarComponent } from './ts/common-top-bar.component';
import { ConnectedBottomBarComponent } from './ts/connected-bottom-bar.component';
import { ConnectedTopBarComponent } from './ts/connected-top-bar.component';
import { BlockedTopBarComponent } from './ts/blocked-top-bar.component';
import { PausedTopBarComponent } from './ts/paused-top-bar.component';
import { PublicTopBarComponent } from './ts/public-top-bar.component';
import { ConnectedRightMenuComponent } from './ts/connected-right-menu.component';

import { AdminLeftMenuComponent } from './ts/admin-left-menu.component';

import { PlayerInfoPopupSubComponent } from './ts/player-info-popup.sub-component';

export const MenuComponent = [
    CommonBottomBarComponent,
    CommonTopBarComponent,
    
    BlockedTopBarComponent,
    
    ConnectedBottomBarComponent,
    ConnectedRightMenuComponent,
    ConnectedTopBarComponent,
    
    PausedTopBarComponent,
    
    PublicBottomBarComponent,
    PublicTopBarComponent,
    
    AdminLeftMenuComponent,
    
    PlayerInfoPopupSubComponent
];
