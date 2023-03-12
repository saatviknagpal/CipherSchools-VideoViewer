import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import VideoCards from "./VideoCards";

export default function Home() {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchVideos = async () => {
    setLoading(true);
    const axi = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/videoList`
    );

    const res = axi.data;
    setLoading(false);
    if (res.status === "success") {
      setVideoData(res.allVideos);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div class="container  mx-auto px-4 md:px-12 min-h-screen ">
        <div class="flex justify-center py-20 flex-wrap -mx-1 lg: gap-5">
          {videoData.length !== 0 ? (
            videoData
              .slice(0)
              .reverse()
              .map((data, index) => {
                return <VideoCards data={data} key={index} />;
              })
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    </>
  );
}
