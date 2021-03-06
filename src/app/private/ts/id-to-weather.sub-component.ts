import { Component, Input } from '@angular/core';

import cloudSun from '@iconify/icons-fa-solid/cloud-sun';
import cloudRain from '@iconify/icons-fa-solid/cloud-rain';
import cloudShowersHeavy from '@iconify/icons-fa-solid/cloud-showers-heavy';
import snowflake from '@iconify/icons-fa-solid/snowflake';
import sun from '@iconify/icons-fa-solid/sun';
import wind from '@iconify/icons-fa-solid/wind';

@Component({
  selector: 'id-to-weather',
  templateUrl: '../html/id-to-weather.sub-component.html'
})

export class IdToWeather {
  @Input()
  weather: any;
  
  cloudSun = cloudSun;
  cloudRain= cloudRain;
  cloudShowersHeavy = cloudShowersHeavy;
  snowflake = snowflake;
  sun = sun;
  wind = wind;
}
