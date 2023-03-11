import React from "react";

export default function VideoPlayer() {
  return (
    <>
      <div className="relative flex   min-h-screen lg:flex-row flex-col overflow-hidden md:justify-center mx-auto">
        <div className="my-14 md:my-auto mx-auto">
          <video width=" w-full md:w-1/2" height="500" controls>
            <source src="https://res.cloudinary.com/dfa0eox0p/video/upload/v1678528334/video/qzwugb1rjfzy4c9sqxsr.mp4" />
          </video>
          <p>Title</p>
          <p>description</p>
        </div>
        <div className="md:my-auto w-full md:mx-auto bg-white md:w-1/2">
          Comments
          <p>Comment 1</p>
          <p>Comment 1</p>
          <p>Comment 1</p>
          <p>Comment 1</p>
          <p>Comment 1</p>
          <p>Comment 1</p>
        </div>
      </div>
    </>
  );
}
