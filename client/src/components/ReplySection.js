import React from "react";

export default function ReplySection({ data }) {
  return (
    <>
      <article className="p-6 mb-6 ml-6 lg:ml-8 text-base  bg-gray-100 shadow-md rounded-lg ">
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
      </article>
    </>
  );
}
