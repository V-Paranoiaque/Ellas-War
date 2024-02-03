import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    private titleService: Title,
    public translate: TranslateService
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get("The Ellas War's team")
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
