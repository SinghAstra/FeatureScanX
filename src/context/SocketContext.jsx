import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;
  const socket = io(SOCKET_ENDPOINT);

  console.log("socket is ", socket);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
