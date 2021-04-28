import { PublicBottomBar } from './ts/public-bottom-bar.component';
import { CommonBottomBar } from './ts/common-bottom-bar.component';
import { CommonTopBar } from './ts/common-top-bar.component';
import { ConnectedBottomBar } from './ts/connected-bottom-bar.component';
import { ConnectedTopBar } from './ts/connected-top-bar.component';
import { BlockedTopBar } from './ts/blocked-top-bar.component';
import { PausedTopBar } from './ts/paused-top-bar.component';
import { PublicTopBar } from './ts/public-top-bar.component';
import { ConnectedRightMenu } from './ts/connected-right-menu.component';

import { AdminLeftMenu } from './ts/admin-left-menu.component';

import { PlayerInfoPopup } from './ts/player-info-popup.sub-component';

export const MenuComponent = [
    CommonBottomBar,
    CommonTopBar,
    
    BlockedTopBar,
    
    ConnectedBottomBar,
    ConnectedRightMenu,
    ConnectedTopBar,
    
    PausedTopBar,
    
    PublicBottomBar,
    PublicTopBar,
    
    AdminLeftMenu,
    
    PlayerInfoPopup
];
