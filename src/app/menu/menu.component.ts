import { PublicBottomBar } from './ts/public-bottom-bar.component';
import { CommonTopBar } from './ts/common-top-bar.component';
import { ConnectedTopBar } from './ts/connected-top-bar.component';
import { PublicTopBar } from './ts/public-top-bar.component';
import { ConnectedRightMenu } from './ts/connected-right-menu.component';

export const MenuComponent = [
    CommonTopBar,
    
    ConnectedRightMenu,
    ConnectedTopBar,
    
    PublicBottomBar,
    PublicTopBar
];
