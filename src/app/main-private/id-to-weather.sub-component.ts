import { Component, Input } from '@angular/core';

import cloudSun from '@iconify/icons-fa6-solid/cloud-sun';
import cloudRain from '@iconify/icons-fa6-solid/cloud-rain';
import cloudShowersHeavy from '@iconify/icons-fa6-solid/cloud-showers-heavy';
import snowflake from '@iconify/icons-fa6-solid/snowflake';
import sun from '@iconify/icons-fa6-solid/sun';
import wind from '@iconify/icons-fa6-solid/wind';

@Component({
  selector: 'app-id-to-weather',
  templateUrl: './id-to-weather.sub-component.html',
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
