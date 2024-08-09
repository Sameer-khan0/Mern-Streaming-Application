import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUser } from "../../redux/user/userFunction";
import { toast } from "react-toastify";

const ChangeBoard = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.userData);

  const [user, setUser] = useState({
    name: "John Doe",
    facebookApi: "https://facebook.com/your-facebook-page",
    youtubeApi: "https://youtube.com/channel/your-channel-id",
    twitterApi: "https://twitter.com/your-twitter-handle",
  });

  const [editingEnabled, setEditingEnabled] = useState(false);

  useEffect(() => {
    if (User) {
      setUser({
        name: User.username || "John Doe",
        facebookApi: User.facebook_api || "https://facebook.com/your-facebook-page",
        youtubeApi: User.youtube_api || "https://youtube.com/channel/your-channel-id",
        twitterApi: User.twitter_api || "https://twitter.com/your-twitter-handle",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEnableEditing = () => {
    setEditingEnabled(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        UpdateUser({
          username: user.name,
          youtube_api: user.youtubeApi,
          facebook_api: user.facebookApi,
          twitter_api: user.twitterApi,
        })
      ).unwrap();
      // console.log(res)
      if (res) {
        toast.success("Update fields successfull")
        setEditingEnabled(false);
      }
      else{
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="w-full h-full mt-8 p-4">
      <h1 className="text-2xl font-semibold text-start mb-4">✍ Update fields</h1>

      <form className="space-y-4" onSubmit={handleSaveChanges}>
        <div className="flex items-center">
          <label htmlFor="name" className="w-1/4 font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!editingEnabled}
            className={`w-full p-2 rounded-md ${
              editingEnabled
                ? "bg-white border-gray-400"
                : "bg-gray-100 border-gray-300"
            }`}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="facebookApi" className="w-1/4 font-medium">
            Facebook API:
          </label>
          <input
            type="text"
            id="facebookApi"
            name="facebookApi"
            value={user.facebookApi}
            onChange={handleInputChange}
            disabled={!editingEnabled}
            className={`w-full p-2 rounded-md ${
              editingEnabled
                ? "bg-white border-gray-400"
                : "bg-gray-100 border-gray-300"
            }`}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="youtubeApi" className="w-1/4 font-medium">
            YouTube API:
          </label>
          <input
            type="text"
            id="youtubeApi"
            name="youtubeApi"
            value={user.youtubeApi}
            onChange={handleInputChange}
            disabled={!editingEnabled}
            className={`w-full p-2 rounded-md ${
              editingEnabled
                ? "bg-white border-gray-400"
                : "bg-gray-100 border-gray-300"
            }`}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="twitterApi" className="w-1/4 font-medium">
            Twitter API:
          </label>
          <input
            type="text"
            id="twitterApi"
            name="twitterApi"
            value={user.twitterApi}
            onChange={handleInputChange}
            disabled={!editingEnabled}
            className={`w-full p-2 rounded-md ${
              editingEnabled
                ? "bg-white border-gray-400"
                : "bg-gray-100 border-gray-300"
            }`}
          />
        </div>

        <div className="flex justify-center">
          {!editingEnabled ? (
            <button
              type="button"
              onClick={handleEnableEditing}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
            >
              Enable Editing
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditingEnabled(false)}
              className="bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-md mr-4"
            >
              Disable Editing
            </button>
          )}

          <button
            type="submit"
            disabled={!editingEnabled}
            className={`py-2 px-4 rounded-md ${
              editingEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeBoard;
