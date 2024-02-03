import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToolsComponent as Tools } from 'src/services/tools.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
})
export class SitemapComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subDesc: Subscription;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    public translate: TranslateService
  ) {
    this.sub = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Find your way and visit ancient Greece')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    this.subDesc = Tools.setDescription(
      this.translate,
      this.metaService,
      'Access the site pages, only public pages are displayed.'
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subDesc.unsubscribe();
  }
}
