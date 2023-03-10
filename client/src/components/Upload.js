import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "@ramonak/react-progress-bar";
import "react-toastify/dist/ReactToastify.css";

export default function Upload() {
  const [selectedVideos, setSelectedVideos] = useState(null);
  const [loaded, setLoaded] = useState(0);

  const navigate = useNavigate();

  const [videoPreview, setVideoPreview] = useState(null);
  const filePicekerRef = useRef(null);

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
  function clearFiles() {
    setVideoPreview(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    console.log(selectedVideos);
    data.append("file", selectedVideos);
    console.log(data);
    try {
      const fetch = await axios.post("/api/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      });
      const res = fetch.data;
      if (res.status === "success") {
        toast.success("Upload successful");
      }
    } catch (err) {
      toast.error(`Upload Fail with status: ${err.message}`);
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <ToastContainer />
        <div className="w-11/12 p-6 m-auto bg-white rounded-xl shadow-xl lg:max-w-xl">
          <h1 className="text-3xl p-3 font-semibold text-center text-red-500">
            Video Upload
          </h1>
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
            <ProgressBar
              bgColor="#21e254"
              labelColor="#ffffff"
              completed={loaded}
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
