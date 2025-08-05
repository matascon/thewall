import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
}

type NewPost = (post: Post) => void;

const useWebSocket = (newPost: NewPost) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8079/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 3000,
      onConnect: () => {
        console.log("✅ Conectado al WebSocket");

        client.subscribe("/topic/posts", (message: IMessage) => {
          const post = JSON.parse(message.body);
          newPost(post);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
    };
  }, []);
};

export default useWebSocket;
