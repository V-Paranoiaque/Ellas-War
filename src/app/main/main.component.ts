import {
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { environment } from './../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BlockedComponent } from '../blocked/blocked.component';
import { CityComponent } from '../city/city.component';
import { PausedComponent } from '../paused/paused.component';
import { MainPublicComponent } from '../main-public/main-public.component';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    BlockedComponent,
    CityComponent,
    MainPublicComponent,
    ModalModule,
    PausedComponent,
    TranslateDirective,
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  protected http = inject(HttpClient);
  protected socket = inject(Socket);
  protected router = inject(Router);
  user = inject(User);
  private readonly platformLocation = inject(PlatformLocation);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('serverModal', { static: false }) serverModal!: ModalDirective;
  displayServerModal = signal(false);
  displayVersionModal = signal(false);
  displayMaintenanceModal = signal(false);

  public localVersion: number;
  public remoteVersion: number;

  constructor() {
    const platformLocation = this.platformLocation;

    this.localVersion = environment.version;
    this.remoteVersion = 0;
    platformLocation.onPopState(() => this.closeAll());
  }

  ngOnInit() {
    this.getApi();
  }

  ngOnDestroy() {
    const elements = document.getElementsByClassName('modal');
    while (elements.length > 0) {
      if (elements[0]) {
        if (elements[0].parentNode) {
          elements[0].parentNode.removeChild(elements[0]);
        }
      }
    }
  }

  closeAll() {
    const openModals = document.querySelectorAll('.modal.show');
    const length = openModals.length;
    for (let i = 0; i < length; i++) {
      //Get the modal-header of the modal
      const modalHeader = openModals[i].getElementsByClassName('modal-header');
      if (modalHeader && modalHeader.length > 0) {
        //Get the close button in the modal header
        const closeButton = modalHeader[0].getElementsByTagName('BUTTON');
        if (closeButton && closeButton.length > 0) {
          //simulate click on close button
          (closeButton[0] as HTMLElement).click();
        }
      }
    }
    return length;
  }

  getApi() {
    const url = this.socket.url + '/api.json';
    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (apiResult: object) => {
          const result = apiResult as {
            min: number;
            maintenance: number;
          };
          try {
            if (result && !result.min) {
              this.displayServerModal.set(true);
            } else {
              this.displayServerModal.set(false);
              this.remoteVersion = result.min;
              this.checkVersion();

              if (!this.displayVersionModal()) {
                this.checkMaintenance(result.maintenance);
              }
            }
          } catch (e: unknown) {
            this.displayServerModal.set(true);
            console.log(e);
          }

          if (this.displayServerModal()) {
            setTimeout(() => {
              this.getApi();
            }, 5000);
          }
        },
        error: () => {
          this.displayServerModal.set(true);

          setTimeout(() => {
            this.getApi();
          }, 5000);
        },
      });
  }

  refresh() {
    if (environment.mobile == 1 || this.socket.local) {
      this.user.reload();
    } else {
      //Redirect to the selected server
      this.socket.redirect(this.socket.url);
    }
  }

  onHidden(): void {
    this.displayServerModal.set(false);
    this.displayVersionModal.set(false);
  }

  checkVersion() {
    if (this.localVersion == 0) {
      this.displayVersionModal.set(false);
    } else if (this.localVersion < this.remoteVersion) {
      this.displayVersionModal.set(true);
    } else {
      this.displayVersionModal.set(false);
    }
  }

  checkMaintenance(maintenance: number) {
    if (maintenance) {
      this.displayMaintenanceModal.set(true);
    } else {
      this.displayMaintenanceModal.set(false);
    }
  }
}
