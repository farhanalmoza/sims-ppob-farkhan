import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import informationServices from '../services/information.services'
import toast from 'react-hot-toast'
import { LoadingScreen } from '../components/LoadingScreen'
import { Navbar } from '../components/Navbar'
import Hero from '../components/Hero'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Service } from '../types/information'
import transactionService from '../services/transaction.services'

export const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [service, setService] = useState<Service>();
  const token = localStorage.getItem('token');
  const { service_code } = useParams();  

  useEffect(() => {
    fetchServices();    
  }, [token, service_code, refreshTrigger]);

  const fetchServices = async () => {
    setIsLoading(true);

    try {
      const response = await informationServices.getServices(token);
      setService(response.data.find(service => service.service_code === service_code));
    } catch (error) {
      toast.error("something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await transactionService.transaction(token, service_code);      
      if (response.status === 0) {
        toast.success(response.message);
        setRefreshTrigger(!refreshTrigger);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      {isLoading && (<LoadingScreen />)}

      <Navbar />

      <div className="px-32 mx-auto">
        <Hero refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />

        <div className="mt-20 flex flex-col gap-3">
          <div className="border-2 border-slate-400 flex items-center px-4 py-3 rounded-lg">
            <FontAwesomeIcon icon={faKeyboard} className="mr-2 text-slate-400" />
            <input
              type="number"
              value={service?.service_tariff}
              readOnly
              className='w-full focus:outline-none' />
          </div>
          <button
            onClick={handleSubmit}
            className='w-full bg-[#f13b2e] text-white rounded-lg disabled:bg-slate-400 py-3 font-medium'
          >Bayar</button>
        </div>
      </div>

    </div>
  )
}

export default Payment