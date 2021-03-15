import { io } from 'socket.io-client';
import { environment } from './../environments/environment';

export class Socket {
  socket: any;
  
  constructor() {
  }
  
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  
  emit(socketName: string, data:any=[]) {
    this.socket.emit(socketName, data);
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
