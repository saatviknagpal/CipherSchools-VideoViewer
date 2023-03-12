import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReplySection from "./ReplySection";
import { toast, ToastContainer } from "react-toastify";

export default function CommentSection({ setComments, comments }) {
  const { id } = useParams();
  const [description, setDescription] = useState(null);
  const [replyDescription, setReplyDescription] = useState(null);
  const [isOpen, setIsOpen] = useState({});
  const [replies, setReplies] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      video_id: id,
      description,
    };
    const axi = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/addComment`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );

    const res = axi.data;
    if (res.status === "success") {
      toast.success(res.message);

      setComments([...comments, res.comment]);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const comment_id = Object.keys(isOpen)[0];

    const formData = {
      description: replyDescription,
      comment_id,
    };
    const axi = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/reply`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    const res = axi.data;

    if (res.status === "success") {
      toast.success(res.message);
    }

    const getReplies = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/getComment/${comment_id}`,
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );

    const replyRes = getReplies.data;
    if (replyRes.status === "success") {
      setReplies({ id: comment_id, details: replyRes.commentDetails.replies });
      setIsOpen({
        ...isOpen,
        [comment_id]: !isOpen[comment_id],
      });
    }
  };

  console.log(isOpen);
  return (
    <>
      <section className="bg-white  py-8 lg:py-16">
        <ToastContainer />
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
              Comments ({comments?.length})
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  dark:border-gray-700">
              <label for="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                placeholder="Write a comment..."
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
          </form>
          {comments
            ?.slice(0)
            .reverse()
            .map((data, index) => {
              return (
                <>
                  <article className="p-6 mb-6 text-base  bg-gray-100 shadow-md rounded-lg ">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${data?.profile_name}`}
                            alt="name_of_commenter"
                          />
                          {data?.profile_name}
                        </p>
                        <p className="text-sm text-gray-600 ">
                          <time pubdate datetime={data?.createdAt}>
                            {new Date(data?.createdAt).toLocaleString()}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500 ">{data?.content}</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        type="button"
                        onClick={() =>
                          setIsOpen({
                            ...isOpen,
                            [data._id]: !isOpen[data._id],
                          })
                        }
                        className="flex items-center text-sm text-gray-500 hover:underline "
                      >
                        <svg
                          aria-hidden="true"
                          className="mr-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                        Reply
                      </button>
                    </div>
                  </article>
                  {isOpen[data._id] ? (
                    <form className="mb-6" onSubmit={handleSubmitReply}>
                      <div className="py-2 ml-6 lg:ml-12 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  dark:border-gray-700">
                        <label for="comment" className="sr-only">
                          Your reply
                        </label>
                        <textarea
                          id="comment"
                          rows="6"
                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                          placeholder="Write a reply..."
                          required
                          onChange={(e) => setReplyDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="inline-flex items-center py-2.5 px-4 ml-6 lg:ml-12 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                          Post Reply
                        </button>
                        <button
                          onClick={() =>
                            setIsOpen({
                              ...isOpen,
                              [data._id]: !isOpen[data._id],
                            })
                          }
                          type="button"
                          className="inline-flex items-center py-2.5 px-4  text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-red-900 hover:bg-red-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : null}

                  <div className="ml-6 border-l-2">
                    {replies?.id === data._id
                      ? replies?.details?.map((replyData, index) => {
                          return <ReplySection data={replyData} key={index} />;
                        })
                      : data?.replies?.length !== 0
                      ? data?.replies?.map((replyData, index) => {
                          return <ReplySection data={replyData} key={index} />;
                        })
                      : null}
                  </div>
                </>
              );
            })}
        </div>
      </section>
    </>
  );
}
