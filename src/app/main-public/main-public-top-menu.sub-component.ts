import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-public-top-menu',
  templateUrl: './main-public-top-menu.sub-component.html',
  styleUrls: ['./main-public.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
})
export class MainPublicTopMenuSubComponent implements OnInit {
  @Input()
  active: string;
  loginForm: FormGroup;

  constructor(
    protected http: HttpClient,
    public socket: Socket,
    private formBuilder: FormBuilder,
    public router: Router,
    public user: User,
    protected modalService: BsModalService
  ) {
    this.loginForm = this.formBuilder.group({});
    this.active = '';
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  onSubmit(data: object) {
    void this.router.navigateByUrl('login');
    const info = data as { username: string; password: string };
    this.socket.emit('connection', {
      username: info.username,
      password: info.password,
      extra: this.user.getExtra(),
    });
  }
}
