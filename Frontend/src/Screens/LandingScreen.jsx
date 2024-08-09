import landingImage from '../assets/Images/vactorlp.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LandingScreen = () => {
  const notify = () => {
    toast("This is a custom styled toast!", {
      className: 'custom-toast',
      progressClassName: 'custom-toast-progress',
    });
  };

  return (
    <div className="flex flex-col pl-[8%] md:flex-row items-center h-[35rem] justify-between p-6">
      <div className="text-center md:text-left md:w-1/2 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Welcome to Social Stream</h1>
        <p className="text-lg md:text-xl mb-6 text-gray-600">
          Connect, share, and stream with friends and the world. Start your journey today!
        </p>
        <button className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600 transition duration-300">
          <Link to='/authentication'>Get Started</Link> 
        </button>
      </div>
      <div onClick={notify} className="md:w-1/2 p-4">
        <img src={landingImage} alt="Social Stream" className="object-contain" />
      </div>
    </div>
  );
};

export default LandingScreen;