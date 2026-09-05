import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Programs from './pages/Programs'
import ContactUs from './pages/ContactUs'
import BrawijayaMuda from './pages/BrawijayaMuda' // Perbaikan: hapus double slash
import BrawijayaBerkelana from './pages/BrawijayaBerkelana'
import EJCS from './pages/EJCS';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/programs/brawijayamuda" element={<BrawijayaMuda />} />
          <Route path="/programs/brawijayaberkelana" element={<BrawijayaBerkelana />} />
          <Route path="/programs/ejcs" element={<EJCS />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App