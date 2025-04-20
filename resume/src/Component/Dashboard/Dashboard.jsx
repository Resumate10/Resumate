import React, { useState, useRef, useEffect } from 'react';
import { Edit, Plus, Award, Briefcase, FileText, Camera, Save, X, Mail, Phone, MapPin, User, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : {
      name: "Your Name",
      email: "your.email@example.com",
      phone: "123-456-7890",
      location: "City, Country",
      bio: "Tell us about yourself...",
      profilePicture: "/api/placeholder/300/300"
    };
  });

  const [editFormData, setEditFormData] = useState({ ...userData });

  useEffect(() => {
    if (userData.profilePicture) {
      setImagePreview(userData.profilePicture);
    }
  }, [userData.profilePicture]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setEditFormData({
          ...editFormData,
          profilePicture: event.target.result
        });
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveProfileChanges = () => {
    axios.post('http://localhost:3001/update-profile', editFormData)
      .then(res => {
        if (res.data.status === "Success") {
          setUserData(res.data.user);
          localStorage.setItem('userData', JSON.stringify(res.data.user));
          setIsEditing(false);
        } else {
          alert("Failed to update profile: " + res.data.error);
        }
      })
      .catch(err => {
        console.error("Error updating profile:", err);
        // For demo purposes, simulate a successful update
        setUserData(editFormData);
        localStorage.setItem('userData', JSON.stringify(editFormData));
        setIsEditing(false);
      });
  };

  const cancelEditing = () => {
    setEditFormData({ ...userData });
    setImagePreview(userData.profilePicture);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-12">
      <div className="container mx-auto px-6 pt-10 relative z-10 ">
        {/* Profile Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {!isEditing ? (
              <div className="flex flex-col md:flex-row">
                {/* Profile Image Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex flex-col items-center justify-center border-r border-gray-100">
                  <div className="relative mb-4">
                    <div className="h-48 w-48 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-1 shadow-lg">
                      <img 
                        src={userData.profilePicture}
                        alt="Profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center">{userData.name || "Your Name"}</h2>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{userData.location || "City, Country"}</span>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-6 w-full bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 transition py-2 px-4 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
                
                {/* Profile Details Section */}
                <div className="md:w-2/3 p-8">
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                      <User className="h-5 w-5 text-blue-500 mr-2" />
                      About Me
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{userData.bio || "Tell us about yourself..."}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email Address</div>
                        <div className="font-medium text-gray-800">{userData.email || "your.email@example.com"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone Number</div>
                        <div className="font-medium text-gray-800">{userData.phone || "123-456-7890"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <h3 className="font-bold text-xl text-gray-800">Edit Profile</h3>
                  <button
                    onClick={cancelEditing}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="h-48 w-48 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-1 shadow-lg">
                        <img 
                          src={imagePreview || editFormData.profilePicture}
                          alt="Profile"
                          className="h-full w-full rounded-full object-cover cursor-pointer"
                          onClick={handleProfilePictureClick}
                        />
                        <div 
                          className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer" 
                          onClick={handleProfilePictureClick}
                        >
                          <Camera className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
                    </div>
                  </div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="location"
                            value={editFormData.location}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="City, Country"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        rows="4"
                        value={editFormData.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={saveProfileChanges}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl flex items-center justify-center font-medium"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
  <Link to="/NewResume">
    <button className="flex items-center border-1 border-indigo-600 bg-white text-indigo-600 hover:text-indigo-800 py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-1">
      <Plus className="h-5 w-5 mr-2" />
      Create Resume
    </button>
  </Link>
</div>

    </div>
    
  );
};

export default Dashboard;