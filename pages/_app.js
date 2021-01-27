import '../styles/globals.css'
import '../styles/style.css'

import reducer, {initialState} from '../contextApi/reducer'
import {StateProvider } from "../contextApi/StateProvider"

if (typeof window !== "undefined") {
  require("jquery");
  require("popper.js");
  require("bootstrap");
}

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap';
import Layout from '../components/Layout'


function MyApp({ Component, pageProps }) {
  return (
   
        <StateProvider initialState = {initialState}
          reducer = {reducer}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateProvider>
    
  )
}

export default MyApp
