import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "@ramonak/react-progress-bar";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

export default function Upload() {
  const [selectedVideos, setSelectedVideos] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const filePicekerRef = useRef(null);
  const token = localStorage.getItem("token");

  function previewFile(e) {
    setSelectedVideos(e.target.files[0]);
    setLoaded(0);
    const reader = new FileReader();
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile.size > 52428800) {
      e.target.value = null;
      toast.error("File is too large. Please select file size < 50Mb");
    } else {
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      }
      reader.onload = (readerEvent) => {
        if (selectedFile.type.includes("video")) {
          setVideoPreview(readerEvent.target.result);
        }
      };
    }
  }
  //   function clearFiles() {
  //     setVideoPreview(null);
  //   }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();
    console.log(selectedVideos);
    data.append("file", selectedVideos);
    data.append("description", description);
    data.append("title", title);
    console.log(data);
    try {
      const fetch = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/upload`,
        data,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          onUploadProgress: (ProgressEvent) => {
            setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
          },
        }
      );
      const res = fetch.data;
      setLoading(false);
      if (res.status === "success") {
        toast.success("Upload successful");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      toast.error(`Upload Fail with status: ${err.response.data.message}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen  overflow-hidden">
        <ToastContainer />
        <div className="w-11/12 p-6 m-auto bg-white rounded-xl shadow-xl lg:max-w-xl">
          <h1 className="text-3xl p-3 font-semibold text-center text-red-500">
            Video Upload
          </h1>
          <p className="text-sm">
            PS: Make sure the video is under 10 MB or else it will take alot of
            time to upload. Max Limit - 50 MB
          </p>
          <p>Supported Video Formats - .mp4, .mkv</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="file"
                className="block text-sm font-semibold text-gray-800"
              >
                Upload Your Videos Here
              </label>
              <input
                type="file"
                ref={filePicekerRef}
                className="block w-full px-4 py-2 mt-2 text-red-500 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="file"
                onChange={previewFile}
                accept="video/*"
                placeholder="Enter your email"
              />
            </div>
            <div className="preview">
              {videoPreview != null && (
                <video controls src={videoPreview}></video>
              )}
            </div>
            <div className="mt-2">
              {videoPreview != null && (
                <>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-red-500 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    name="title"
                    placeholder="Enter video title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-red-500 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    name="description"
                    placeholder="Enter video description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </>
              )}
            </div>
            <ProgressBar
              bgColor="#21e254"
              labelColor="#ffffff"
              completed={loaded}
              maxCompleted={100}
              className="mt-4 mb-1"
            >
              {isNaN(Math.round(loaded, 2)) ? 0 : Math.round(loaded, 2)}%
            </ProgressBar>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
