import React, { useState } from "react";
import { useAuthStore } from "../store/UseAuthStore";

const ProfilePage = () => {
  const [editOption, setEditOption] = useState(false);
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [profilePic, setProfilePic] = useState(null); // holds the file object

  const handleEditToggle = () => {
    setEditOption((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleProfileEdit = async () => {
    if (!profilePic) {
      alert("Please select a profile picture before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", profilePic);

    await updateProfile(formData);
    setEditOption(false);
    setProfilePic(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Cover Section */}
      <div className="w-full h-60 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
        <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
          {editOption ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : authUser.profilePic}
              alt="profile"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800">{authUser.fullName}</h1>
        <p className="text-gray-500 mt-2">Tech Explorer | ChatApp Enthusiast 🚀</p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-indigo-600">128</p>
            <p className="text-sm text-gray-600">Messages</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-indigo-600">64</p>
            <p className="text-sm text-gray-600">Friends</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-indigo-600">7</p>
            <p className="text-sm text-gray-600">Groups</p>
          </div>
        </div>

        {/* Edit/Submit Button */}
        {editOption ? (
          <button
            onClick={handleProfileEdit}
            disabled={isUpdatingProfile}
            className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
          >
            {isUpdatingProfile ? "Uploading..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Optional: Additional Info */}
      <div className="mt-12 max-w-3xl w-full px-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">About</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          I’m a passionate developer exploring chat applications and real-time communication. I love building intuitive user experiences and engaging designs. Always learning, always coding!
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
