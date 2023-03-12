import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentSection from "./CommentSection";
import ReactPlayer from "react-player";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiTwotoneDislike,
} from "react-icons/ai";

import { BsFillShareFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

export default function VideoPlayer() {
  const [videoData, setVideoData] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const { id } = useParams();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const user_id = userDetails?._id;
  const fetchVideoDetails = async () => {
    const axi = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/videoDetails/${id}`
    );

    const res = axi.data;

    if (res.status === "success") {
      setVideoData(res.videoDetails);
      setComments(res.videoDetails.comments);
      setLiked(res.videoDetails.likes);
      setDisliked(res.videoDetails.dislikes);
    }
  };
  const fetchViews = async () => {
    const axi = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/views/${id}`
    );

    const res = axi.data;

    console.log(res);
  };

  const handleLike = async () => {
    setLiked([...liked, user_id]);
    const index = disliked.indexOf(user_id);
    if (index > -1) {
      disliked.splice(index, 1);
    }
    const axi = await axios({
      method: "put",
      url: process.env.REACT_APP_BACKEND_URL + "/api/like/" + id,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });

    const res = axi.data;

    console.log(res);
  };

  const handleDislike = async () => {
    setDisliked([...disliked, user_id]);
    const index = liked.indexOf(user_id);
    if (index > -1) {
      liked.splice(index, 1);
    }

    const axi = await axios({
      method: "PUT",
      url: process.env.REACT_APP_BACKEND_URL + "/api/dislike/" + id,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });

    const res = axi.data;

    console.log(res);
  };
  useEffect(() => {
    fetchVideoDetails();
    fetchViews();
  }, []);

  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    toast.info("Copied Link to Clipboard");
  }

  console.log(liked, disliked);
  return (
    <>
      <div className="relative flex lg:h-screen lg:flex-row flex-col overflow-hidden md:justify-center mx-auto bg-white">
        <ToastContainer />
        <div className="mt-14 w-full md:w-1/2 mx-auto">
          <ReactPlayer
            url={videoData?.url}
            width="w-full"
            height="h-full"
            controls
          />

          <div className="flex p-4 flex-col break-words">
            <div className="flex gap-2 md:gap-4 mb-4 items-center text-sm md:text-lg">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${videoData?.uploaded_by}`}
                  alt="name_of_uploader"
                />
                {videoData?.uploaded_by}
              </p>
              <p className="flex-1">{videoData?.views} Views</p>
              <div className="flex gap-2">
                <button className="flex justify-center gap-1 items-center">
                  {!liked?.includes(user_id) ? (
                    <AiOutlineLike
                      onClick={() => {
                        handleLike();
                      }}
                      className="h-6 w-6"
                    />
                  ) : (
                    <AiTwotoneLike className="h-6 w-6" />
                  )}

                  <p className="text-lg">{liked?.length}</p>
                </button>
                <button className="flex justify-center gap-1 items-center">
                  {!disliked?.includes(user_id) ? (
                    <AiOutlineDislike
                      onClick={() => {
                        handleDislike();
                      }}
                      className="h-6 w-6"
                    />
                  ) : (
                    <AiTwotoneDislike className="h-6 w-6" />
                  )}
                  <p className="text-lg">{disliked?.length}</p>
                </button>
              </div>

              <button
                onClick={copy}
                className="ml-3 flex items-center gap-2 bg-gray-200 rounded-full p-2"
              >
                <BsFillShareFill className="h-5 w-5" /> Share
              </button>
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
