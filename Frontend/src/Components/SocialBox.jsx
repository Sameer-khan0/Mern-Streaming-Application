import { FiYoutube, FiInstagram, FiTwitter } from "react-icons/fi";

const socialPlatforms = [
  { name: "YouTube", icon: FiYoutube, color: "red" },
  { name: "Instagram", icon: FiInstagram, color: "purple" },
  { name: "Twitter", icon: FiTwitter, color: "sky-blue" },
];

const getColorClasses = (color) => {
  switch (color) {
    case "red":
      return {
        bg: "bg-white",
        border: "border-red-500",
        buttonBg: "bg-red-500",
        buttonText: "text-white",
      };
    case "purple":
      return {
        bg: "bg-white",
        border: "border-purple-500",
        buttonBg: "bg-purple-500",
        buttonText: "text-white",
      };
    case "sky-blue":
      return {
        bg: "bg-white",
        border: "border-blue-500",
        buttonBg: "bg-blue-500",
        buttonText: "text-white",
      };
    default:
      return {
        bg: "bg-gray-300",
        border: "border-gray-500",
        buttonBg: "bg-gray-500",
        buttonText: "text-white",
      };
  }
};

const SocialBoxes = ({ connect, selectplatform }) => {

  const handelClick = (connect, platform) => {
    connect();
    selectplatform(platform);
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 p-2">
      {socialPlatforms.map((platform, index) => {
        const { bg, border, buttonBg, buttonText } = getColorClasses(
          platform.color
        );

        return (
          <div
            key={index}
            className={`social-box shadow-md rounded-lg p-4 w-full md:w-56 text-center border-2 ${bg} ${border}`}
          >
            <div className="mb-4">
              <platform.icon className={`w-20 h-20 mx-auto text-black`} />
            </div>
            <div className="text-xl font-bold mb-2">{platform.name}</div>
            <button
              className={`font-bold py-2 px-4 rounded ${buttonBg} ${buttonText}`}
              onClick={() => handelClick(connect, platform.name)}
            >
              Connect
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SocialBoxes;
