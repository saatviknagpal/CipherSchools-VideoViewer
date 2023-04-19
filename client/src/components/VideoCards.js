import React from "react";

export default function VideoCards({ data }) {
  const thumbNailUrl = data.url.slice(0, -3) + "jpg";
  return (
    <>
      <div className="my-1  w-full md:w-1/2 lg:my-4  lg:w-[30%] rounded-lg bg-white border border-gray-200 shadow-lg h-full">
        <a href={`/video/${data._id}`} className="relative">
          <img
            className="rounded-t-lg lg:h-60 w-full relative"
            src={thumbNailUrl}
            alt=""
          />
          <p className="bg-black text-white p-1 w-max absolute -mt-9 ml-2 text-sm">
            {data.uploaded_by}
          </p>
        </a>

        <div className="p-5 space-y-5 flex flex-col">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 break-words">
            {data.title}
            <p className="mb-3 font-semibold text-gray-700 h-10 truncate ">
            {data.views} Views
          </p>
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-10 truncate ">
            {data.description}
          </p>
          <a
            href={`/video/${data._id}`}
            className="inline-flex items-center w-max px-3 py-2 text-sm font-medium 
             text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch Video
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
