import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero';
import informationServices from '../services/information.services';
import { Service } from '../types/information';

// import images
import { Navbar } from '../components/Navbar';
import { LoadingScreen } from '../components/LoadingScreen';

function Menu({ code, name, icon }) {
  return (
    <a href={`/payment/${code}`}
      key={code}
      className="flex gap-2 flex-col justify-items-center w-20">
      <img src={icon} alt={name} className='w-20 h-20' />
      <p className='text-center text-sm text-wrap'>{name}</p>
    </a>
  )
}

const Home = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchServices();
  }, [refreshTrigger]);

  const fetchServices = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await informationServices.getServices(token);
      setServices(response.data); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {isLoading && (<LoadingScreen />)}

      <Navbar />

      <div className="px-32 mx-auto">
        <Hero refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />

        <div className="flex justify-between mt-20">
          {services.map((service) => (
            <Menu
              key={service.service_code}
              code={service.service_code}
              name={service.service_name}
              icon={`/images/${service.service_code}.png`}
            />
          ))}
        </div>

        <div className="mt-16">
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

    </div>
  )
}

export default Home;