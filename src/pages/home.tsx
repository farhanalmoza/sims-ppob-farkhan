import React from 'react'
import logo from "../assets/images/logo.png"
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="px-20 mx-auto">
      <div className="flex justify-between py-8 items-center">
        <div className="flex gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="font-bold text-xl">SIMS PPOB FARKHAN</h1>
        </div>

        <div className="flex gap-8 items-center">
          <a href="" className='px-4 text-lg font-semibold'>Top Up</a>
          <a href="" className='px-4 text-lg font-semibold'>Transaction</a>
          <a href="" className='px-4 text-lg font-semibold'>Akun</a>
        </div>
      </div>

      <Hero />
    </div>
  )
}

export default Home;