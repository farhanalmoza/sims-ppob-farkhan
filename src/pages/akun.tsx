import { useEffect, useState } from 'react'
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { Profile } from '../types/profile';
import authServices from '../services/auth.services';
import { faAt, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

export const Akun = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    first_name: '',
    last_name: '',
  });
  const [profileImage, setProfileImage] = useState("/images/default-avatar.png");

  useEffect(() => {
    fetchUser();
  }, [token, isLoading]);

  const fetchUser = async () => {
    try {
      const data = await authServices.getUser(token);
      setProfileData(data.data);
      setUpdateProfile({
        first_name: data.data.first_name,
        last_name: data.data.last_name,
      });
      if (profileData?.profile_image !== 'https://minio.nutech-integrasi.com/take-home-test/null') {
        setProfileImage(data.data.profile_image);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    if (file && file.size <= 100 * 1024) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await authServices.updateImage(token, formData);

        if (response.status === 0) {
          setProfileImage(response.data.profile_image);
          toast.success(response.message);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Gambar maksimal 100KB");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProfile({ ...updateProfile, [name]: value });
  };

  const handleSubmitProfile = async () => {
    setIsLoading(true);
    try {
      const data = await authServices.updateProfile(token, updateProfile);
      if (data.status === 0) {
        toast.success(data.message);
        setIsEditing(false);
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      {isLoading && (<LoadingScreen />)}
      <Navbar />

      <div className="px-32 mx-auto flex flex-col justify-center mt-20">
        <div className="relative w-fit mx-auto">
          <img src={profileImage} alt="profile-image" className="w-32 h-w-32 rounded-full border border-slate-400" />
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => document.getElementById('imageUpload')?.click()}
            className="rounded-full border border-slate-400 w-4 h-4 p-2 cursor-pointer absolute bottom-0 right-0" />
          <input type="file" id="imageUpload" accept='image/*' style={{ display: 'none' }} onChange={handleImageUpload} />
        </div>

        <div className="px-40 mt-10 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                <FontAwesomeIcon icon={faAt} className="mr-2" />
                <input
                  type="email"
                  name="email"
                  value={profileData?.email}
                  className="text-black w-full focus:outline-none"
                  readOnly
                />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="first_name">Nama Depan</label>
            <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                <FontAwesomeIcon icon={faAt} className="mr-2" />
                <input
                  type="text"
                  name="first_name"
                  value={updateProfile?.first_name}
                  onChange={handleInputChange}
                  className="text-black w-full focus:outline-none"
                  readOnly={!isEditing}
                />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="last_name">Nama Belakang</label>
            <div className="border-2 border-slate-400 flex items-center px-4 py-2 rounded-lg">
                <FontAwesomeIcon icon={faAt} className="mr-2" />
                <input
                  type="text"
                  name="last_name"
                  value={updateProfile?.last_name}
                  onChange={handleInputChange}
                  className="text-black w-full focus:outline-none"
                  readOnly={!isEditing}
                />
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className='text-red-500 border border-red-500 py-3 rounded-lg font-medium'
                >Edit Profile</button>
                <button className='bg-red-500 text-white py-3 rounded-lg font-medium'>Logout</button>
              </>
            ) : (
              <button
                onClick={handleSubmitProfile}
                className='bg-red-500 text-white py-3 rounded-lg font-medium'>Simpan</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
