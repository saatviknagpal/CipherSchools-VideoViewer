import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function CommentSection({ setComments, comments }) {
  const { id } = useParams();
  const [description, setDescription] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      video_id: id,
      description,
    };
    const axi = await axios.post("/api/addComment", formData, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });

    const res = axi.data;
    if (res.status === "success") {
      setComments([...comments, res.comment]);
    }
  };

  return (
    <>
      <section className="bg-white  py-8 lg:py-16">
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
                <article className="p-6 mb-6 text-base shadow-lg bg-white rounded-lg ">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${data?.profile_name}`}
                          alt="Michael Gough"
                        />
                        {data?.profile_name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time pubdate datetime={data?.createdAt}>
                          {new Date(data?.createdAt).toLocaleString()}
                        </time>
                      </p>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {data?.content}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
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
              );
            })}
        </div>
      </section>
    </>
  );
}
