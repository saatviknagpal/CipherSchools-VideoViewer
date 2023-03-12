import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCards from "./VideoCards";

export default function MyVideos() {
  const [videoData, setVideoData] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const id = userDetails?._id;
  const fetchVideos = async () => {
    const axi = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/videoList/${id}`,
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );

    const res = axi.data;

    if (res.status === "success") {
      setVideoData(res.myVideo);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <>
      <div class="container  mx-auto px-4 md:px-12 min-h-screen ">
        <p className="text-3xl text-center font-bold pt-20">
          Your Beautiful Videos
        </p>

        <div class="flex justify-center py-5 flex-wrap -mx-1 lg: gap-5">
          {videoData.length !== 0 ? (
            videoData
              .slice(0)
              .reverse()
              .map((data, index) => {
                return <VideoCards data={data} key={index} />;
              })
          ) : (
            <a href="/upload" className="newQuote w-max mx-auto">
              Create your first video
            </a>
          )}
        </div>
      </div>
    </>
  );
}
