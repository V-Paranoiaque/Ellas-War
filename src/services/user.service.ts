export class User {
  info: any;
  
  constructor() {
    this.info = {
      'id': 0,
      'mstatus': 0
    }
  }
  
  setUser(user: any) {
    this.info = user;
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
}
