import { Client } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const socket = new SockJS("http://localhost:8079/ws");
const stompClient = new Client({
  webSocketFactory: () => socket,
  debug: (str) => console.log(str),
  onConnect: () => {
    console.log("Connected to WebSocket");
  },
});

export default stompClient;
