import { AuthProvider } from '../components/providers/auth'
import GlobalStyle from '../components/styles/GlobalStyle'
import '../components/chat/MessageList.css'
import Head from 'next/head'
import ImgReact from '../img/react.svg'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Head >
          <link
            rel="icon"
            href={ImgReact.src}
          />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )


}