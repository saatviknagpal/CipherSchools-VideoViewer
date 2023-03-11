import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentSection from "./CommentSection";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
  const [videoData, setVideoData] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const fetchVideoDetails = async () => {
    const axi = await axios.get(`/api/videoDetails/${id}`);

    const res = axi.data;

    if (res.status === "success") {
      setVideoData(res.videoDetails);
      setComments(res.videoDetails.comments);
    }
  };
  useEffect(() => {
    fetchVideoDetails();
  }, []);
  console.log(videoData?.url);
  return (
    <>
      <div className="relative flex h-screen lg:flex-row flex-col overflow-hidden md:justify-center mx-auto bg-white">
        <div className="my-14 w-full md:w-1/2 mx-auto">
          <ReactPlayer
            url={videoData?.url}
            width="w-full"
            height="h-full"
            controls
          />

          <div className="flex p-4 flex-col break-words">
            <div className="flex justify-between mb-4">
              <p>{videoData?.views} Views</p>
              <p>{videoData?.likes} Likes</p>
            </div>
            <p className="text-2xl font-bold">{videoData?.title}</p>
            <p className="text-lg text-gray-500">{videoData?.description}</p>
          </div>
        </div>
        <div className=" w-full bg-white md:w-1/2 md:p-6 border border-gray-200 shadow-lg overflow-y-scroll">
          <CommentSection comments={comments} setComments={setComments} />
        </div>
      </div>
    </>
  );
}
