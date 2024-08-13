import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Router } from '@angular/router';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('serverModal', { static: false }) serverModal!: ModalDirective;
  displayServerModal = false;
  displayVersionModal = false;
  displayMaintenanceModal = false;

  public localVersion: number;
  public remoteVersion: number;
  private sub: Subscription;

  constructor(
    protected http: HttpClient,
    protected socket: Socket,
    protected router: Router,
    public user: User,
    protected modalService: BsModalService,
    private platformLocation: PlatformLocation
  ) {
    this.localVersion = environment.version;
    this.remoteVersion = 0;
    this.sub = new Subscription();
    platformLocation.onPopState(() => this.closeAll());
  }

  ngOnInit() {
    this.getApi();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();

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
    this.sub = this.http.get(url).subscribe({
      next: (apiResult: object) => {
        const result = apiResult as {
          min: number;
          maintenance: number;
        };
        try {
          if (result && !result.min) {
            this.displayServerModal = true;
          } else {
            this.displayServerModal = false;
            this.remoteVersion = result.min;
            this.checkVersion();

            if (!this.displayVersionModal) {
              this.checkMaintenance(result.maintenance);
            }
          }
        } catch (e: unknown) {
          this.displayServerModal = true;
          console.log(e);
        }

        if (this.displayServerModal) {
          setTimeout(() => {
            this.getApi();
          }, 5000);
        }
      },
      error: () => {
        this.displayServerModal = true;

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
    this.displayServerModal = false;
    this.displayVersionModal = false;
  }

  checkVersion() {
    if (this.localVersion == 0) {
      this.displayVersionModal = false;
    } else if (this.localVersion < this.remoteVersion) {
      this.displayVersionModal = true;
    } else {
      this.displayVersionModal = false;
    }
  }

  checkMaintenance(maintenance: number) {
    if (maintenance) {
      this.displayMaintenanceModal = true;
    } else {
      this.displayMaintenanceModal = false;
    }
  }
}
