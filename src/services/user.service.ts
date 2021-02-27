export class User {
  info: any;
  newMsg: number;
  
  constructor() {
    this.info = {
      'id': 0,
      'mstatus': 0,
      'level': 0,
      'datas': {},
      'style': 'default',
      
      'army': {},
      'building': {}
    }
    this.newMsg = 0;
  }
  
  setUser(user: any) {
    this.info = user;
  }
  
  buildTemple1Allowed() {
    return this.getPropertyNb('hermes') + this.getPropertyNb('apollo') +
           this.getPropertyNb('demeter');
  }
  buildTemple2Allowed() {
    if(this.getLevel() < 6) {
      return 1;
    }
    return this.getPropertyNb('ares') + this.getPropertyNb('athena');
  }
  buildTemple3Allowed() {
    if(this.getLevel() < 8) {
      return 1;
    }
    return this.getPropertyNb('artemis') + this.getPropertyNb('dionysus') +
           this.getPropertyNb('hephaestus');
  }
  buildTemple4Allowed() {
    if(this.getLevel() < 10) {
      return 1;
    }
    return this.getPropertyNb('zeus') + this.getPropertyNb('hades') +
           this.getPropertyNb('poseidon');
  }
  
  getArmy() {
    let list = [];
    
    for(let i in this.info.datas.army) {
      //Only if we have the required level or if we have the unit
      if(this.info.level >= this.info.datas.army[i].lvlmini ||
         this.info[i] > 0) {
        this.info.datas.army[i].code = i;
        list.push(this.info.datas.army[i]);
      }
    }
    
    return list;
  }
  
  getBuildings() {
    let list = [];
    
    for(let i in this.info.datas.building) {
      //Only if we have the required level
      if(this.info.level >= this.info.datas.building[i].lvlmini) {
        this.info.datas.building[i].code = i;
        list.push(this.info.datas.building[i]);
      }
    }
    
    return list;
  }
  
  getDatas() {
    return this.info.datas;
  }
  
  getId() {
    return this.info.id;
  }
  
  getLevel() {
    return this.info.level;
  }
  
  getProperty(name:string) {
    if(this.info[name]) {
      return this.info[name];
    }
    else {
      return '';
    }
  }
  
  getPropertyNb(name:string) {
    if(this.info[name]) {
      return this.info[name];
    }
    else {
      return 0;
    }
  }
  
  getQuest() {
    return this.info.quest;
  }
  getQuestValidate() {
    return this.info.quest_validate;
  }
  
  getQuestMax() {
    switch(this.info.level) {
      case 0: return 14;
      case 1: return 13;
      case 2: return 12;
      case 3: return 9;
      case 4: return 10;
      case 5: return 7;
      case 6: return 8;
      case 7: return 7;
      case 8: return 10;
      case 9: return 18;
    }
    
    return 0;
  }
  
  setNewMsg(nb:number) {
    this.newMsg = nb;
  }
  getNewMsg() {
    return this.newMsg;
  }
}
