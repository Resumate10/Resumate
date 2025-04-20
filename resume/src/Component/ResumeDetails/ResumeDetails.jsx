import { useState } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

const ResumeBuilder = () => {

  const resumeRef = useRef(null);

  const generatePDF = () => {
    const element = resumeRef.current;
    console.log(element);
    if (!element) return;

    const opt = {
      margin: 10,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    education: [{ institution: "", degree: "", year: "", gpa: "" }],
    experience: [{ company: "", position: "", duration: "", description: "" }],
    skills: "",
    projects: [
      {
        name: "",
        techStack: "",
        description: "",
        sourceCode: "",
      },
    ],
  });
  const [activeTab, setActiveTab] = useState("personal");
  const [theme, setTheme] = useState("white");

  const themeColors = {
    white: {
      primary: "bg-white",
      secondary: "bg-gray-50",
      accent: "text-black",
      button: "bg-gray-800 hover:bg-gray-900",
      border: "border-gray-200",
      tag: "bg-gray-100 text-gray-800",
      divider: "border-black",
      headerText: "text-black",
    },
    blue: {
      primary: "bg-blue-600",
      secondary: "bg-blue-100",
      accent: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200",
      tag: "bg-blue-100 text-blue-800",
    },
    green: {
      primary: "bg-emerald-600",
      secondary: "bg-emerald-100",
      accent: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700",
      border: "border-emerald-200",
      tag: "bg-emerald-100 text-emerald-800",
    },
    purple: {
      primary: "bg-purple-600",
      secondary: "bg-purple-100",
      accent: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      border: "border-purple-200",
      tag: "bg-purple-100 text-purple-800",
    },
    red: {
      primary: "bg-red-600",
      secondary: "bg-red-100",
      accent: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
      border: "border-red-200",
      tag: "bg-red-100 text-red-800",
    },
    gray: {
      primary: "bg-gray-500",
      secondary: "bg-gray-100",
      accent: "text-gray-500",
      button: "bg-gray-500 hover:bg-gray-600",
      border: "border-gray-200",
      tag: "bg-gray-100 text-gray-700",
    },
    teal: {
      primary: "bg-teal-600",
      secondary: "bg-teal-100",
      accent: "text-teal-600",
      button: "bg-teal-600 hover:bg-teal-700",
      border: "border-teal-200",
      tag: "bg-teal-100 text-teal-800",
    },
    indigo: {
      primary: "bg-indigo-600",
      secondary: "bg-indigo-100",
      accent: "text-indigo-600",
      button: "bg-indigo-600 hover:bg-indigo-700",
      border: "border-indigo-200",
      tag: "bg-indigo-100 text-indigo-800",
    },
    slate: {
      primary: "bg-slate-700",
      secondary: "bg-slate-100",
      accent: "text-slate-700",
      button: "bg-slate-700 hover:bg-slate-800",
      border: "border-slate-300",
      tag: "bg-slate-100 text-slate-800",
    },
  };

  const colors = themeColors[theme];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", year: "", gpa: "" },
      ],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: "", position: "", duration: "", description: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      const newEducation = formData.education.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        education: newEducation,
      });
    }
  };

  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      const newExperience = formData.experience.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        experience: newExperience,
      });
    }
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { name: "", techStack: "", description: "", sourceCode: "" },
      ],
    });
  };

  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      const newProjects = formData.projects.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        projects: newProjects,
      });
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </div>
        );
      case "objective":
        return (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Objective
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200 h-32`}
              placeholder="Briefly describe your professional background and key strengths"
            />
          </div>
        );
      case "Projects":
        return (
          <div className="space-y-6 animate-fadeIn">
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-sm border ${colors.border} bg-white relative`}
              >
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    disabled={formData.projects.length <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="Incridea"
                    />
                  </div>

                  {/* Tech Stack and Source Code in one row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Tech Stack (comma separated)
                      </label>
                      <input
                        type="text"
                        name="techStack"
                        value={project.techStack}
                        onChange={(e) => handleProjectChange(index, e)}
                        className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                        placeholder="React, NextJs, TailwindCSS, GSAP, GraphQL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Source Code (URL)
                      </label>
                      <input
                        type="url"
                        name="sourceCode"
                        value={project.sourceCode}
                        onChange={(e) => handleProjectChange(index, e)}
                        className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                        placeholder="https://github.com/username/project-name"
                      />
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="A web app to provide details, manage event flow for annual college fest..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addProject}
              className={`px-4 py-2 ${colors.button} text-white rounded-lg shadow-sm flex items-center justify-center transition duration-200 w-full md:w-auto`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Project
            </button>
          </div>
        );
      case "education":
        return (
          <div className="space-y-6 animate-fadeIn">
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm border ${colors.border} bg-white relative`}
              >
                <div className="absolute top-3 right-3">
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    disabled={formData.education.length <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Institution
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="University of California, Berkeley"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, e)}
                        className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                        placeholder="2018 - 2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        GPA
                      </label>
                      <input
                        type="text"
                        name="gpa"
                        value={edu.gpa}
                        onChange={(e) => handleEducationChange(index, e)}
                        className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className={`px-4 py-2 ${colors.button} text-white rounded-lg shadow-sm flex items-center justify-center transition duration-200 w-full md:w-auto`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Education
            </button>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-6 animate-fadeIn">
            {formData.experience.map((exp, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm border ${colors.border} bg-white relative`}
              >
                <div className="absolute top-3 right-3">
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    disabled={formData.experience.length <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="Google Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200`}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200 h-24`}
                      placeholder="Describe your responsibilities and achievements in this role"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className={`px-4 py-2 ${colors.button} text-white rounded-lg shadow-sm flex items-center justify-center transition duration-200 w-full md:w-auto`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Experience
            </button>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Skills (comma separated)
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${colors.accent} focus:border-transparent transition duration-200 h-32`}
                placeholder="JavaScript, React, Node.js, Python, SQL, Data Analysis"
              />
            </div>
            {formData.skills && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2 text-gray-700">
                  Preview:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.split(",").map(
                    (skill, index) =>
                      skill.trim() && (
                        <span
                          key={index}
                          className={`${colors.tag} px-3 py-1 text-sm rounded-full font-medium`}
                        >
                          {skill.trim()}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme("blue")}
                className={`w-6 h-6 rounded-full bg-blue-600 ${
                  theme === "blue" ? "ring-2 ring-blue-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("green")}
                className={`w-6 h-6 rounded-full bg-emerald-600 ${
                  theme === "green" ? "ring-2 ring-emerald-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("purple")}
                className={`w-6 h-6 rounded-full bg-purple-600 ${
                  theme === "purple" ? "ring-2 ring-purple-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("gray")}
                className={`w-6 h-6 rounded-full bg-gray-600 ${
                  theme === "gray" ? "ring-2 ring-gray-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("teal")}
                className={`w-6 h-6 rounded-full bg-teal-800 ${
                  theme === "teal" ? "ring-2 ring-teal-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("indigo")}
                className={`w-6 h-6 rounded-full bg-indigo-900 ${
                  theme === "indigo" ? "ring-2 ring-indigo-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("slate")}
                className={`w-6 h-6 rounded-full bg-slate-600 ${
                  theme === "slate" ? "ring-2 ring-slate-300" : ""
                }`}
              />
              <button
                onClick={() => setTheme("white")}
                className={`w-6 h-6 rounded-full bg-white ${
                  theme === "white" ? "ring-2 ring-black" : ""
                }`}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === "personal"
                  ? `${colors.accent} border-b-2 ${colors.border.replace(
                      "border",
                      "border-b"
                    )}`
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal
            </button>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === "objective"
                  ? `${colors.accent} border-b-2 ${colors.border.replace(
                      "border",
                      "border-b"
                    )}`
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("objective")}
            >
              Objective
            </button>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === "education"
                  ? `${colors.accent} border-b-2 ${colors.border.replace(
                      "border",
                      "border-b"
                    )}`
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("education")}
            >
              Education
            </button>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === "skills"
                  ? `${colors.accent} border-b-2 ${colors.border.replace(
                      "border",
                      "border-b"
                    )}`
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === "experience"
                  ? `${colors.accent} border-b-2 ${colors.border.replace(
                      "border",
                      "border-b"
                    )}`
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("experience")}
            >
              Experience
            </button>
            <button
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === "Projects"
                  ? `${colors.accent} border-b-2 ${colors.border.replace(
                      "border",
                      "border-b"
                    )}`
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("Projects")}
            >
              Projects
            </button>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>

      {/* Right side - Resume Preview */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto bg-gray-100 border-t lg:border-t-0 lg:border-l">
        <div className="max-w-2xl mx-auto">
          <div id="resume" ref={resumeRef}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header Section - Theme-colored background with appropriate text */}
              <div
                className={`
      transition-all
      duration-300 ${
                  theme === "white" ? "bg-white" : colors.primary
                } py-8 px-8 border-b ${
                  theme === "white" ? "border-gray-300" : "border-transparent"
                }`}
              >
                <h1
                  className={`text-3xl font-bold text-center ${
                    theme === "white" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {formData.name || "Your Name"}
                </h1>
                <div
                  className={`text-center text-sm mt-2 flex flex-wrap justify-center gap-x-3 ${
                    theme === "white" ? "text-gray-600" : "text-gray-200"
                  }`}
                >
                  {formData.email && (
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {formData.email}
                    </span>
                  )}
                  {formData.phone && (
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {formData.phone}
                    </span>
                  )}
                  {formData.address && (
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {formData.address}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8">
                {formData.summary && (
                  <div className="mb-6 pb-4 border-b border-gray-300">
                    <h2
                      className={`text-lg font-semibold border-b border-gray-300 pb-1 mb-3 ${
                        theme === "white" ? "text-gray-900" : colors.accent
                      }`}
                    >
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {formData.summary}
                    </p>
                  </div>
                )}

                {formData.experience.some(
                  (exp) => exp.company || exp.position
                ) && (
                  <div className="mb-6 pb-4 border-b border-gray-300">
                    <h2
                      className={`text-lg font-semibold border-b border-gray-300 pb-1 mb-3 ${
                        theme === "white" ? "text-gray-900" : colors.accent
                      }`}
                    >
                      Experience
                    </h2>
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-800">
                            {exp.company || "Company Name"}
                          </h3>
                          <span className="text-sm text-gray-600 whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium mb-1">
                          {exp.position}
                        </p>
                        <p className="text-sm text-gray-700">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {formData.education.some(
                  (edu) => edu.institution || edu.degree
                ) && (
                  <div className="mb-6 pb-4 border-b border-gray-300">
                    <h2
                      className={`text-lg font-semibold border-b border-gray-300 pb-1 mb-3 ${
                        theme === "white" ? "text-gray-900" : colors.accent
                      }`}
                    >
                      Education
                    </h2>
                    {formData.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-800">
                            {edu.institution}
                          </h3>
                          <span className="text-sm text-gray-600 whitespace-nowrap">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{edu.degree}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {formData.skills && (
                  <div className="mb-6 pb-4 border-b border-gray-300">
                    <h2
                      className={`text-lg font-semibold border-b border-gray-300 pb-1 mb-3 ${
                        theme === "white" ? "text-gray-900" : colors.accent
                      }`}
                    >
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(",").map(
                        (skill, index) =>
                          skill.trim() && (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                )}

                {formData.projects.some(
                  (project) =>
                    project.name || project.techStack || project.description
                ) && (
                  <div className="mb-6 pb-4 border-b border-gray-300">
                    <h2
                      className={`text-lg font-semibold border-b border-gray-300 pb-1 mb-3 ${
                        theme === "white" ? "text-gray-900" : colors.accent
                      }`}
                    >
                      Projects
                    </h2>
                    {formData.projects.map((project, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                          <h3 className="font-semibold text-gray-800">
                            {project.name}
                          </h3>
                          {project.techStack && (
                            <p className="text-sm text-gray-600">
                              {project.techStack}
                            </p>
                          )}
                        </div>
                        {project.description && (
                          <p className="text-sm text-gray-700 mt-1">
                            {project.description}
                          </p>
                        )}
                        {project.sourceCode && (
                          <a
                            href={project.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                          >
                            View Source Code
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={generatePDF}
              className={`
      py-3 
      px-6 
      rounded-lg 
      font-medium
      shadow-md
      transition-all
      duration-300
      flex
      items-center
      justify-center
      gap-2
      hover:shadow-lg
      hover:scale-105
      active:scale-95
      ${
        theme === "white"
          ? "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
          : `${colors.primary} text-white hover:bg-opacity-90`
      }
    `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
