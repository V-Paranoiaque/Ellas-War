import { io } from 'socket.io-client';
import { environment } from './../environments/environment';

export class Socket {
  socket: any;
  
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    
    this.socket.on("connect", () => {
      this.loadUser();
    });
  }
  
  emit(socketName: string, data:any=[]) {
    this.socket.emit(socketName, data);
  }
  
  loadUser() {
    this.emit('loadConfig');
    
    let localToken = localStorage.getItem('token');
    if(localToken) {
      this.emit('ewAuth', {'token': localToken});
    }
  }
  
  on(socketName: string, callback:any) {
    this.socket.on(socketName, (data:any) =>{
      callback(data);
    })
  }
  removeListener(socketName: string) {
    this.socket.removeListener(socketName);
  }
}
