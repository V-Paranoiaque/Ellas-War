import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconifyIcon } from 'iconify-icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Wrapper to @visurel/iconify-angular. (https://github.com/visurel/iconify-angular)
 * Since this lib is no longer maintained, this component replace it without any modification to the code.
 * All you need to do is to install iconify-icon (yarn add iconify-icon)
 */

@Component({
  selector: 'app-ic-icon',
  template:
    '<svg [innerHTML]="iconHtml" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" [attr.viewBox]="viewbox" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);width: inherit;height: inherit;"></svg>',
})
export class IcIconComponent implements OnChanges {
  @Input() icon: IconifyIcon | null = null;
  iconHtml: SafeHtml = '';
  viewbox = '';

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.icon && changes['icon']) {
      this.iconHtml = this.sanitizer.bypassSecurityTrustHtml(this.icon.body);
      this.viewbox = `0 0 ${this.icon.width} ${this.icon.height}`;
    }
  }
}
