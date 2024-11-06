import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import Hero from '../components/Hero'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'


export const TopUp = () => {
  function TopUpButton({ amount }) {
    return (
      <button
        onClick={() => handleAmountButton(amount)}
        className='w-full border border-slate-400 rounded-lg py-3 font-medium hover:border-none hover:bg-[#f13b2e] hover:text-white'
      >
        Rp{amount}
      </button>
    )
  }
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [amount, setAmount] = useState(0);

  const handleAmountButton = (amount) => {
    const { value } = amount;
    setAmount(value);
  }

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setAmount(value);
  }

  return (
    <>
      <Navbar />
      <div className="px-32 mx-auto">
        <Hero />

        <div className="mt-20">
          <h2 className='text-lg'>Silahkan masukkan</h2>
          <h1 className='text-4xl font-bold'>Nominal Top Up</h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-14">
          <div className="col-span-2 flex flex-col gap-3">
            <div className="border-2 border-slate-400 flex items-center px-4 py-3 rounded-lg">
              <FontAwesomeIcon icon={faKeyboard} className="mr-2 text-slate-400" />
              <input
                type="number"
                value={amount}
                onChange={handleChangeInput}
                className='w-full focus:outline-none'
                placeholder="masukkan nominal Top Up" />
            </div>
            <button
              className='w-full bg-[#f13b2e] text-white rounded-lg disabled:bg-slate-400 py-3 font-medium'
              disabled={isButtonDisabled}
            >Top Up</button>
          </div>

          <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            <TopUpButton amount={10000} />
            <TopUpButton amount={20000} />
            <TopUpButton amount={50000} />
            <TopUpButton amount={100000} />
            <TopUpButton amount={250000} />
            <TopUpButton amount={500000} />
          </div>
        </div>
      </div>

    </>
  )
}
