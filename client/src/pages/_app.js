import "@/styles/globals.css";
import {Provider } from 'react-redux'
import store from "@/store/store";
import { useEffect } from "react";
import { connectWithSocketIOSERVER } from "@/utils/wss";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    connectWithSocketIOSERVER()
  }, [])
  return (
    <>
    <Provider store={store}> 
    <Component {...pageProps} />
    </Provider>
    </>
  );
}
