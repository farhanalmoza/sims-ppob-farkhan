import React from 'react'
import Hero from '../components/Hero';

// import images
import PBB from "@/assets/images/PBB.png";
import Listrik from "@/assets/images/Listrik.png";
import Pulsa from "@/assets/images/Pulsa.png";
import PDAM from "@/assets/images/PDAM.png";
import Game from "@/assets/images/Game.png";
import Kurban from "@/assets/images/Kurban.png";
import Musik from "@/assets/images/Musik.png";
import PaketData from "@/assets/images/Paket-Data.png";
import PGN from "@/assets/images/PGN.png";
import Televisi from "@/assets/images/Televisi.png";
import VoucherMakanan from "@/assets/images/Voucher-Makanan.png";
import Zakat from "@/assets/images/Zakat.png";
import Banner1 from "@/assets/images/Banner1.png";
import Banner2 from "@/assets/images/Banner2.png";
import Banner3 from "@/assets/images/Banner3.png";
import Banner4 from "@/assets/images/Banner4.png";
import Banner5 from "@/assets/images/Banner5.png";
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
        <Menu title="PBB" icon={PBB} />
        <Menu title="Listrik" icon={Listrik} />
        <Menu title="Pulsa" icon={Pulsa} />
        <Menu title="PDAM" icon={PDAM} />
        <Menu title="PGN" icon={PGN} />
        <Menu title="TV Langganan" icon={Televisi} />
        <Menu title="Musik" icon={Musik} />
        <Menu title="Voucher Game" icon={Game} />
        <Menu title="Voucher Makanan" icon={VoucherMakanan} />
        <Menu title="Kurban" icon={Kurban} />
        <Menu title="Zakat" icon={Zakat} />
        <Menu title="Paket Data" icon={PaketData} />
      </div>

      <div className="mt-16 px-32 mx-auto">
        <h2 className='font-semibold mb-5'>Temukan promo menarik</h2>
        <div className="absolute">
          <div className="flex gap-8 no-scrollbar overflow-x-scroll">
            <img src={Banner1} alt="banner1" className="w-full h-full" />
            <img src={Banner2} alt="banner2" className="w-full h-full" />
            <img src={Banner3} alt="banner3" className="w-full h-full" />
            <img src={Banner4} alt="banner4" className="w-full h-full" />
            <img src={Banner5} alt="banner5" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;