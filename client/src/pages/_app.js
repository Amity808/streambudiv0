import "@/styles/globals.css";
import {Provider } from 'react-redux'
import { makeStore } from "@/store/store";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={makeStore}> 
    <Component {...pageProps} />
    </Provider>
    </>
  );
}
