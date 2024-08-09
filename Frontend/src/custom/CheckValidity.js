import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUser } from "../../redux/user/userFunction";
import { useDispatch } from 'react-redux';

const useAuthCheck = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const checkValidity = async () => {
      const isToken = localStorage.getItem('atoken');
      if (!isToken) {
        navigate('/authentication');
      }
      const user = await dispatch(GetUser())
      console.log(user)
      if (user.meta.requestStatus !== "fulfilled") {
        localStorage.clear();
        navigate('/authentication');
      }
    };
    checkValidity();
  }, []);
};

export default useAuthCheck;
