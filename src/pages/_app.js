import { AuthProvider } from '../components/providers/auth'
import GlobalStyle from '../components/styles/GlobalStyle'

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