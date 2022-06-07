import Layout from '../components/layout'
import '../styles/globals.css'
const axios = require('axios').default;

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}