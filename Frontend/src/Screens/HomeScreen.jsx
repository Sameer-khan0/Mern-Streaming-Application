import ProfileBox from "../Components/ProfileBox";
import ChangeBox from "../Components/ChangeBoard"; // Ensure this path is correct
import CheckValidity from "../custom/CheckValidity";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {GetUser } from '../../redux/user/userFunction'

function HomeScreen() {
  const dispatch = useDispatch();
  CheckValidity();
  // const User = useSelector((state) => state.user.userData);
  // console.log(User)

  useEffect(() => {
    dispatch(GetUser());
  }, []);

  // const user = {
  //   name: 'John Doe',
  //   email: 'johndoe@example.com',
  //   twitterLink: 'https://twitter.com/johndoe',
  //   facebookLink: 'https://facebook.com/johndoe',
  //   instagramLink: 'https://instagram.com/johndoe',
  // };

  return (
    <div className="flex flex-col items-center justify-evenly p-6 h-[35rem]">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
      🤚 Welcome, to Social Stream
      </h1>
      <div className="flex flex-col-reverse lg:flex-row justify-evenly items-start w-full gap-10">
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
          <ChangeBox />
        </div>
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <ProfileBox />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
