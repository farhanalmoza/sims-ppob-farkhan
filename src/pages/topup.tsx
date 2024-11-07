import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import Hero from '../components/Hero'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import transactionServices from '../services/transaction.services'
import toast from 'react-hot-toast';

export const TopUp = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState()
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleAmountButton = (amount) => {
    const value = amount;
    setAmount(value);
    handleDisabledButton(value);
  }

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setAmount(value);
    handleDisabledButton(value);
  }

  const handleDisabledButton = (amount) => {
    if (amount >= 10000) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  const handleSubmitTopUp = async () => {
    const { token } = localStorage;
    setIsLoading(true);

    try {
      const response = await transactionServices.topUp(token, amount);
      setStatus(response.status);
      setMessage(response.message);
      toast.success(response.message);
      setRefreshTrigger(true);
    } catch (error) {
      setStatus(102);
      setMessage("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />
      )}
      <Navbar />
      <div className="px-32 mx-auto">
        <Hero refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />

        <div className="mt-20">
          <h2 className='text-lg'>Silahkan masukkan</h2>
          <h1 className='text-4xl font-bold'>Nominal Top Up</h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-14">
          <div className="col-span-2 flex flex-col gap-3">
            {status !== 0 && (
              <p className="text-red-500">{message}</p>
            )}
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
              onClick={handleSubmitTopUp}
              className='w-full bg-[#f13b2e] text-white rounded-lg disabled:bg-slate-400 py-3 font-medium'
              disabled={isButtonDisabled}
            >Top Up</button>
          </div>

          <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            <button onClick={() => handleAmountButton(10000)} className='btn-amount-topup'>Rp10.000</button>
            <button onClick={() => handleAmountButton(20000)} className='btn-amount-topup'>Rp20.000</button> 
            <button onClick={() => handleAmountButton(50000)} className='btn-amount-topup'>Rp50.000</button>
            <button onClick={() => handleAmountButton(100000)} className='btn-amount-topup'>Rp100.000</button>
            <button onClick={() => handleAmountButton(250000)} className='btn-amount-topup'>Rp250.000</button>
            <button onClick={() => handleAmountButton(500000)} className='btn-amount-topup'>Rp500.000</button>
          </div>
        </div>
      </div>

    </>
  )
}
