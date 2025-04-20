import React, { useState, useRef } from 'react';
import { Bell, Download, Edit, HelpCircle, Plus, Trash2, Award, BookOpen, Briefcase, Code, FileText, Zap, Camera, Save, X, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  // Get user data from localStorage
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : {
      name: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      profilePicture: "/api/placeholder/150/150"
    };
  });

  // Temporary state for editing
  const [editFormData, setEditFormData] = useState({ ...userData });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Handle profile picture change
  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditFormData({
        ...editFormData,
        profilePicture: "/api/placeholder/150/150?text=New"
      });
    }
  };

  // Save profile changes
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
        alert("An error occurred while updating the profile.");
      });
  };

  // Cancel profile editing
  const cancelEditing = () => {
    setEditFormData({ ...userData });
    setIsEditing(false);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I update my profile?",
      answer: "Click the 'Edit' button in your profile section to modify your information."
    },
    {
      question: "How can I change my password?",
      answer: "Go to Settings and select 'Change Password' to update your credentials."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we use industry-standard encryption to protect your data."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <div className="container mx-auto px-4 -mt-6 pt-8">
        {/* Tab Navigation with Create Resume Button */}
        <div className="flex bg-white rounded-t-lg shadow-md mb-6 overflow-hidden justify-between items-center">
          <div className="flex">
            <button 
              className={`px-8 py-4 font-medium text-sm transition flex items-center ${activeTab === 'overview' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'text-gray-600 hover:bg-indigo-50'}`}
              onClick={() => setActiveTab('overview')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </button>
          
            <button 
              className={`px-8 py-4 font-medium text-sm transition flex items-center ${activeTab === 'help' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'text-gray-600 hover:bg-indigo-50'}`}
              onClick={() => setActiveTab('help')}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </button>
          </div>
          
          <Link to="/NewResume" className="mr-4">
            <button className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 py-2 px-4 focus:outline-none hover:from-indigo-700 hover:to-purple-700 rounded-lg text-base shadow-md transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Create Resume
            </button>
          </Link>
        </div>
        
        {/* Main Content */}
        {activeTab === 'overview' && (
          <div className="max-w-3xl mx-auto">
            {/* User Profile Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Award className="h-5 w-5 text-indigo-600 mr-2" />
                  User Profile
                </h3>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-indigo-600 hover:text-indigo-800 transition flex items-center text-sm font-medium"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              
              <div className="p-6">
                {!isEditing ? (
                  // Display Mode
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-1">
                        <img 
                          src={userData.profilePicture}
                          alt="Profile"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h4 className="text-2xl font-bold text-gray-800">{userData.name}</h4>
                      <div className="flex items-center justify-center mt-1 text-indigo-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="text-gray-600">{userData.location}</span>
                      </div>
                      <p className="text-gray-600 mt-3">{userData.bio}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center text-gray-600 mb-2">
                          <Mail className="h-4 w-4 mr-2 text-indigo-500" />
                          {userData.email}
                        </div>
                        <div className="flex items-center justify-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-indigo-500" />
                          {userData.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="h-32 w-32 rounded-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-1">
                          <img 
                            src={editFormData.profilePicture}
                            alt="Profile"
                            className="h-full w-full rounded-full object-cover cursor-pointer"
                            onClick={handleProfilePictureClick}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer" onClick={handleProfilePictureClick}>
                            <Camera className="h-8 w-8 text-white" />
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
                    
                    <form className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          rows="3"
                          value={editFormData.bio}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={saveProfileChanges}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition shadow-md flex items-center justify-center"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition flex items-center justify-center"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <HelpCircle className="h-5 w-5 text-indigo-600 mr-2" />
                Help & Support
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                    <h5 className="font-medium text-gray-800 mb-2">{faq.question}</h5>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
