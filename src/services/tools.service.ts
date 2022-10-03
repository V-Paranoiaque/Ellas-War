import { Component } from '@angular/core';
import * as codeList from '../assets/codeName.json'

@Component({
  selector: 'app-tools',
  template: `
    <ng-content></ng-content>
  `
})

export class ToolsComponent {
  static range(a:number, b:number) {
    let list = []
    for(a;a<=b;a++) {
      list.push(a);
    }
    return list;
  }
  
  static paramToObject(url:string) {
    let resultList:any = {};
    
    let list = url.split('&')
    let size:number = list.length;
    for(let i=0;i<size;i++){
      let tmp:any = list[i].split('=');
      if(tmp.length >= 2) {
        resultList[tmp[0]] = tmp[1];
      }
    }
    
    return resultList;
  }
  
  static getResId(name:string) {
    switch(name) {
      case 'drachma': return 0;
      case 'food': return 1;
      case 'water': return 2;
      case 'wood': return 3;
      case 'iron': return 4;
      case 'stone': return 5;
      case 'marble': return 6;
      case 'grapes': return 7;
      case 'wine': return 8;
      case 'gold': return 9;
      case 'favor': return 10;
      case 'ambrosia': return 11;
    }
    
    return name;
  }
  
  static addToObject(resultArray:any, newArray:any) {
    for(let j in newArray) {
      if(!resultArray[j]) {
        resultArray[j] = 0;
      }
      resultArray[j] += newArray[j];
    }
    return resultArray;
  }

  static nameTranslate(code:string, kind:number) {
    //Persian
    if(kind == 1) {
      const newNames = {
        'hoplite': 'hoplitemercenary',
        'myrmidon': 'immortal',
        'mountedarchery': 'scythedchariot',
        'mountedhoplite': 'warelephant'
      };
      if(newNames[code as keyof typeof newNames]) {
        return newNames[code as keyof typeof newNames];
      }
    }

    return code;
  }

  static getName(code:string, nb=1, kind=0) {
    let res: { name: string, names:string };

    res = codeList[this.nameTranslate(code, kind) as keyof typeof codeList] as {
      name: string,
      names: string
    };

    if(!res) {
      return 'Unknown name';
    }

    if(nb > 1) {
      return res.names;
    }
    return res.name;
  }
}
