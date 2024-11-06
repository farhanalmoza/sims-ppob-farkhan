import React from 'react'
import Hero from '../components/Hero';

// import images
import { Navbar } from '../components/Navbar';

function Menu({ title, icon }) {
  return (
    <div className="flex gap-2 flex-col justify-items-center w-20">
      <img src={icon} alt={title} className='w-20 h-20' />
      <p className='text-center text-sm text-wrap'>{title}</p>
    </div>
  )
}

const Home = () => {
  return (
    <div className="">
      <Navbar />

      <div className="px-32 mx-auto">
        <Hero />
      </div>

      <div className="flex justify-between mt-20 px-32 mx-auto">
        <Menu title="PBB" icon="/images/PBB.png" />
        <Menu title="Listrik" icon="/images/Listrik.png" />
        <Menu title="Pulsa" icon="/images/Pulsa.png" />
        <Menu title="PDAM" icon="/images/PDAM.png" />
        <Menu title="PGN" icon="/images/PGN.png" />
        <Menu title="TV Langganan" icon="/images/Televisi.png" />
        <Menu title="Musik" icon="/images/Musik.png" />
        <Menu title="Voucher Game" icon="/images/Game.png" />
        <Menu title="Voucher Makanan" icon="/images/Voucher-Makanan.png" />
        <Menu title="Kurban" icon="/images/Kurban.png" />
        <Menu title="Zakat" icon="/images/Zakat.png" />
        <Menu title="Paket Data" icon="/images/Paket-Data.png" />
      </div>

      <div className="mt-16 px-32 mx-auto">
        <h2 className='font-semibold mb-5'>Temukan promo menarik</h2>
        <div className="absolute">
          <div className="flex gap-8 no-scrollbar overflow-x-scroll">
            <img src="/images/Banner1.png" alt="banner1" className="w-full h-full" />
            <img src="/images/Banner2.png" alt="banner2" className="w-full h-full" />
            <img src="/images/Banner3.png" alt="banner3" className="w-full h-full" />
            <img src="/images/Banner4.png" alt="banner4" className="w-full h-full" />
            <img src="/images/Banner5.png" alt="banner5" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;