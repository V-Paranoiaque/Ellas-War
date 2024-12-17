import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import cloudSun from '@iconify/icons-fa6-solid/cloud-sun';
import cloudRain from '@iconify/icons-fa6-solid/cloud-rain';
import cloudShowersHeavy from '@iconify/icons-fa6-solid/cloud-showers-heavy';
import snowflake from '@iconify/icons-fa6-solid/snowflake';
import sun from '@iconify/icons-fa6-solid/sun';
import wind from '@iconify/icons-fa6-solid/wind';

import { IcIconComponent } from 'src/services/ic-icon.service';

@Component({
  selector: 'app-id-to-weather',
  templateUrl: './id-to-weather.sub-component.html',
  imports: [IcIconComponent, TranslateModule],
})
export class IdToWeatherSubComponent {
  @Input()
  weather!: string;

  cloudSun = cloudSun;
  cloudRain = cloudRain;
  cloudShowersHeavy = cloudShowersHeavy;
  snowflake = snowflake;
  sun = sun;
  wind = wind;
}
