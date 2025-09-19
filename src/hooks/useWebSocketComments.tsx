import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Comment {
  id: number;
  content: string;
  userName: string;
}

type NewComment = (comment: Comment) => void;

const useWebSocketComments = (newComment: NewComment, postId: number) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://backend:8079/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 3000,
      onConnect: () => {
        client.subscribe("/topic/comments/" + postId, (message: IMessage) => {
          const comment = JSON.parse(message.body);
          newComment(comment);
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

export default useWebSocketComments;
