import { useSelector } from "react-redux";
import backgroundSaldo from "../assets/images/background-saldo.png"
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import authServices from "../services/auth.services";
import transactionServices from "../services/transaction.services";
import { Profile } from "../types/profile";
import defaultAvatar from "../assets/images/default-avatar.png";

const Hero = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [balance, setBalance] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();   
    fetchBalance(); 
  }, [token]);

  const fetchUser = async () => {
    try {
      if (token) {
        const data = await authServices.getUser(token);
        setProfileData(data.data);
      } else {
        setError("Token tidak ditemukan");
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  const fetchBalance = async () => {
    try {
      if (token) {
        const response = await transactionServices.getBalance(token);
        setBalance(response.data.balance);        
      } else {
        setError("Token tidak ditemukan");
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  const profileImage = profileData?.profile_image && profileData.profile_image !== 'https://minio.nutech-integrasi.com/take-home-test/null'
    ? profileData.profile_image
    : defaultAvatar;
  
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  }

  return (
    <div className="flex justify-between mt-10">
      <div className="w-full">
        <img src={profileImage} alt="profile-image" className="w-[70px] h-[70px] rounded-full" />
        <div className="text-xl">Selamat datang,</div>
        <div className="text-4xl font-bold">{profileData?.first_name} {profileData?.last_name}</div>
      </div>

      <div className="relative w-full">
        <img src={backgroundSaldo} alt="background-saldo" className="absolute" />
        <div className="absolute text-white py-4 px-5">
          <p className="text-xl">Saldo Anda</p>
          <p className="text-3xl font-bold mt-4 mb-3">
            {isBalanceVisible ? `Rp. ${balance}` : 'Rp. ********'}
          </p>
          <button onClick={toggleBalanceVisibility} className="text-sm hover:underline">
            {isBalanceVisible ? 'Tutup Saldo' : 'Lihat Saldo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero;