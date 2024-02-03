import { Component } from '@angular/core';
import * as codeList from '../assets/codeName.json';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-tools',
  template: ` <ng-content></ng-content> `,
})
export class ToolsComponent {
  static range(a: number, b: number) {
    const list = [];
    for (a; a <= b; a++) {
      list.push(a);
    }
    return list;
  }

  static paramToObject(url: string) {
    const resultList = new Map<string, string>();

    const list = url.split('&');
    const size: number = list.length;
    for (let i = 0; i < size; i++) {
      const tmp: string[] = list[i].split('=');
      if (tmp.length >= 2) {
        resultList.set(tmp[0], tmp[1]);
      }
    }

    return resultList;
  }

  static nameTranslate(code: string, kind: number) {
    //Persian
    if (kind === 1) {
      const newNames = {
        hoplite: 'hoplitemercenary',
        myrmidon: 'immortal',
        hippeis: 'scythedchariot',
        mountedhoplite: 'warelephant',
      };
      if (newNames[code as keyof typeof newNames]) {
        return newNames[code as keyof typeof newNames];
      }
    }

    return code;
  }

  static getName(code: string, nb = 1, kind = 0) {
    const res: { name: string; names: string } = codeList[
      this.nameTranslate(code, kind) as keyof typeof codeList
    ] as {
      name: string;
      names: string;
    };

    if (!res) {
      return 'Unknown name';
    }

    if (nb > 1) {
      return res.names;
    }
    return res.name;
  }

  static getDivineBonus(id: number) {
    switch (id) {
      case 1:
        return 'bonus-iron';
      case 2:
        return 'bonus-wood';
      case 3:
        return 'bonus-grapes';
      case 4:
        return 'bonus-stone';
      case 5:
        return 'bonus-marble';
      case 6:
        return 'bonus-wine';
      case 7:
        return 'bonus-gold';
      case 8:
        return 'bonus-favor';
      case 9:
        return 'spartan';
      case 10:
        return 'menu-temple';
      case 11:
        return 'treasure';
      case 12:
        return 'menu-agora';
      case 13:
        return 'smenu-attacks';
      case 14:
        return 'bonus-drachma';

      case 24:
        return 'basket-iron';
      case 25:
        return 'basket-silver';
      case 26:
        return 'basket-gold';
    }
    return 'default';
  }
  static getDivineBonusName(id: number) {
    switch (id) {
      case 1:
        return 'Iron';
      case 2:
        return 'Wood';
      case 3:
        return 'Grapes';
      case 4:
        return 'Stone';
      case 5:
        return 'Marble';
      case 6:
        return 'Wine';
      case 7:
        return 'Gold';
      case 8:
        return 'Favor';
      case 9:
        return 'Spartan';
      case 10:
        return 'Temple units';
      case 11:
        return 'Treasure';
      case 12:
        return 'Agora';
      case 13:
        return 'Attacks';
      case 14:
        return 'Drachma';

      case 24:
        return 'Iron basket';
      case 25:
        return 'Silver basket';
      case 26:
        return 'Golden basket';
    }
    return 'default';
  }

  static addToObject(resultArray: object, newArray: object) {
    for (const j in newArray) {
      if (!resultArray[j as keyof typeof resultArray]) {
        (resultArray[j as keyof typeof resultArray] as number) = 0;
      }
      (resultArray[j as keyof typeof resultArray] as number) =
        parseInt(resultArray[j as keyof typeof resultArray]) +
        parseInt(newArray[j as keyof typeof newArray]);
    }
    return resultArray;
  }

  static getResId(name: string) {
    switch (name) {
      case 'drachma':
        return 0;
      case 'food':
        return 1;
      case 'water':
        return 2;
      case 'wood':
        return 3;
      case 'iron':
        return 4;
      case 'stone':
        return 5;
      case 'marble':
        return 6;
      case 'grapes':
        return 7;
      case 'wine':
        return 8;
      case 'gold':
        return 9;
      case 'favor':
        return 10;
      case 'ambrosia':
        return 11;
    }

    return name;
  }

  static getResName(id: number | string): string {
    switch (id) {
      case 0:
      case '0':
        return 'drachma';
      case 1:
      case '1':
        return 'food';
      case 2:
      case '2':
        return 'water';
      case 3:
      case '3':
        return 'wood';
      case 4:
      case '4':
        return 'iron';
      case 5:
      case '5':
        return 'stone';
      case 6:
      case '6':
        return 'marble';
      case 7:
      case '7':
        return 'grapes';
      case 8:
      case '8':
        return 'wine';
      case 9:
      case '9':
        return 'gold';
      case 10:
      case '10':
        return 'favor';
      case 11:
      case '11':
        return 'ambrosia';
    }

    return id.toString();
  }

  static nbDigits(nb: number) {
    const tab = nb.toString().split('.');
    if (tab.length <= 1) {
      return 0;
    }
    return tab[1].length;
  }

  static setDescription(
    translate: TranslateService,
    metaService: Meta,
    text: string
  ) {
    return translate.get(text).subscribe((res: string) => {
      metaService.removeTag('name=description');
      metaService.addTag({ name: 'description', content: res });
    });
  }

  static getStyle(style: string) {
    if (!environment.style.allowed.includes(style)) {
      return environment.style.default;
    }

    return style;
  }
}
