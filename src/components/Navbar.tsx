import React from 'react'

export const Navbar = () => {
  return (
    <div className="flex justify-between py-8 items-center border-b border-slate-300 px-32 mx-auto">
      <div className="flex gap-2">
        <img src="/images/Logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="font-bold text-xl">SIMS PPOB FARKHAN</h1>
      </div>

      <div className="flex gap-8 items-center">
        <a href="/top-up" className={`px-4 text-lg font-semibold hover:underline ${window.location.pathname === '/top-up' ? 'text-[#f13b2e]' : ''}`}>Top Up</a>
        <a href="" className='px-4 text-lg font-semibold hover:underline'>Transaction</a>
        <a href="" className='px-4 text-lg font-semibold hover:underline'>Akun</a>
      </div>
    </div>
  )
}
