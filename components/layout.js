

import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
    <div data-theme='cupcake'>
      <Navbar />
      <main>{children}</main>
      <div class="divider"></div>
      <Footer />
    </div>
    </>
  )
}