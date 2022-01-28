import { AuthProvider } from '../components/providers/auth'
import GlobalStyle from '../components/styles/GlobalStyle'
import '../components/chat/MessageList.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )


}