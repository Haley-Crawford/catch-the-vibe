import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className='app'>
      <Header />
      <Navbar />
      <main className='main'>
        <Outlet /> {/* This is where child routes render */}
      </main>
      <Footer />
    </div>
  )
}