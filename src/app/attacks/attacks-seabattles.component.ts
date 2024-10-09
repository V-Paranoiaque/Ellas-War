import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AttacksSeabattlesMovePopupSubComponent } from './attacks-seabattles-move-popup.sub-component';

import questionCircle from '@iconify/icons-bi/question-circle';
import trireme from '@iconify/icons-game-icons/trireme';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

interface RankingLineSB {
  player_id: number;
  ranking: number;
  username: string;
  points: number;
}

@Component({
  templateUrl: './attacks-seabattles.component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
})
export class AttacksSeabattlesComponent implements OnInit, OnDestroy {
  public sbData = {
    sb_id: 0,
    sb_status: 0,
    sb_nb: 0,
    start_date: 0,
    coins: 0,
    mouvements: 0,
    sb_map: {},
  };
  public currentCase = {
    case_type: -1,
    can_engage: 0,
    color_id: 0,
    player_id: 0,
    username: '',
    x: 0,
    y: 0,
    bireme: 0,
    trireme: 0,
    quadrireme: 0,
    leviathan: 0,
    oxybeles: 0,
  };
  public currentUnit = {
    name: '',
    code: '',
    attack: 0,
    defense: 0,
    cost: 0,
    engage: '',
    error: -1,
  };
  public caseList: string[] = [];
  bsModalRef?: BsModalRef;

  public rankingList: RankingLineSB[] = [];
  public rankingPage = 1;
  public rankingMax = 1;
  private subRank: Subscription;

  questionCircle = questionCircle;
  shieldShaded = shieldShaded;
  swordIcon = swordIcon;
  trireme = trireme;

  Object = Object;
  Tools = Tools;

  constructor(
    protected http: HttpClient,
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    protected modalService: BsModalService
  ) {
    this.subRank = new Subscription();
    for (let i = 1; i <= 15; i++) {
      for (let j = 1; j <= 15; j++) {
        this.caseList.push('case-' + i.toString() + '-' + j.toString() + '');
      }
    }
  }

  ngOnInit() {
    this.socket.emit('sbGet');
    this.getPage();

    this.socket.on('sbGet', (data: object) => {
      this.sbData = data as typeof this.sbData;
    });
    this.socket.on('sbGetCase', (data: object) => {
      this.currentCase = data as typeof this.currentCase;
      const name =
        this.currentCase.x.toString() + '_' + this.currentCase.y.toString();
      (this.sbData.sb_map[name as keyof typeof this.sbData.sb_map] as object) =
        this.currentCase;
    });
    this.socket.on('sbJoin', (data: object) => {
      this.sbData = data as typeof this.sbData;
    });
    this.socket.on('sbRefresh', () => {
      this.socket.emit('sbGet');
    });
    this.socket.on('sbCaseRefresh', () => {
      this.socket.emit('sbGetCase', {
        map_id: this.sbData.sb_id,
        x: this.currentCase.x,
        y: this.currentCase.y,
      });
    });
    this.socket.on('sbRankingRefresh', () => {
      this.getPage();
    });
  }

  ngOnDestroy() {
    this.subRank.unsubscribe();

    this.socket.removeListener('sbJoin');
    this.socket.removeListener('sbGet');
    this.socket.removeListener('sbGetCase');
    this.socket.removeListener('sbRefresh');
    this.socket.removeListener('sbRankingRefresh');
  }

  sbJoin() {
    this.socket.emit('sbJoin');
  }

  getCase(x: number, y: number) {
    /** Types:
     * 0: border
     * 1: unknown
     * 2: empty
     * 3: army
     * 4: capital
     */
    const name = x.toString() + '_' + y.toString();
    if (this.isBorder(x, y)) {
      return {
        case_type: 0,
        can_engage: 0,
        player_id: 0,
        x: x,
        y: y,
        bireme: 0,
        trireme: 0,
        quadrireme: 0,
        leviathan: 0,
        oxybeles: 0,
      };
    } else if (Object.hasOwn(this.sbData.sb_map, name)) {
      return this.sbData.sb_map[name as keyof typeof this.sbData.sb_map];
    } else {
      return {
        case_type: 1,
        can_engage: 0,
        color_id: 0,
        player_id: 0,
        username: '',
        x: x,
        y: y,
        bireme: 0,
        trireme: 0,
        quadrireme: 0,
        leviathan: 0,
        oxybeles: 0,
      };
    }
  }
  isBorder(x: number, y: number) {
    if (
      (x <= 5 && y <= 5) ||
      (x <= 5 && y >= 11) ||
      (x >= 11 && y <= 5) ||
      (x >= 11 && y >= 11)
    ) {
      return true;
    }
    return false;
  }

  selectCase(x: number, y: number) {
    this.currentCase = this.getCase(x, y) as typeof this.currentCase;
    this.socket.emit('sbGetCase', {
      map_id: this.sbData.sb_id,
      x: this.currentCase.x,
      y: this.currentCase.y,
    });
  }

  getUnitsCurrent(name: string) {
    return this.currentCase[name as keyof object];
  }

  selectUnit(info: object) {
    this.currentUnit = info as typeof this.currentUnit;
    this.currentUnit.engage = '';
    this.currentUnit.error = -1;
  }

  onDropCase(
    event: CdkDragDrop<{
      case_type: number;
      can_engage: number;
      color_id: number;
      player_id: number;
      username: string;
      x: number;
      y: number;
      bireme: number;
      trireme: number;
      quadrireme: number;
      leviathan: number;
      oxybeles: number;
    }>
  ) {
    if (event) {
      const src_case = event.previousContainer.id.substring(5).split('-');
      const dest_case = event.container.id.substring(5).split('-');
      this.selectCase(parseInt(src_case[0]), parseInt(src_case[1]));

      // Picked the same case for src and dest
      if (src_case[0] === dest_case[0] && src_case[1] === dest_case[1]) {
        return;
      }

      const initialState: ModalOptions = {
        initialState: {
          sb_id: this.sbData.sb_id,
          src_case: {
            x: parseInt(src_case[0]),
            y: parseInt(src_case[1]),
          },
          dest_case: {
            x: parseInt(dest_case[0]),
            y: parseInt(dest_case[1]),
          },
          player_id: this.getCase(
            parseInt(dest_case[0]),
            parseInt(dest_case[1])
          ).player_id,
        },
      };
      this.bsModalRef = this.modalService.show(
        AttacksSeabattlesMovePopupSubComponent,
        initialState
      );
    }
  }

  onDropCaseNull() {
    return null;
  }

  getPage() {
    const url =
      this.socket.url +
      '/api/rankingSeaBattles/' +
      this.rankingPage.toString() +
      '.json';
    this.subRank = this.http.get(url).subscribe(res => {
      const result = res as {
        cPage: number;
        max: number;
        ranking: RankingLineSB[];
      };
      this.rankingPage = result.cPage;
      this.rankingMax = result.max;
      this.rankingList = result.ranking;
    });
  }
}
