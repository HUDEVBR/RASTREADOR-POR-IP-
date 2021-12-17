import { ToastContainer } from 'react-toastify'
import GlobalStyle from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
