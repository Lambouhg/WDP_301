import React from "react";

const ShortVideoSection = ({ isEditing, video, setVideo }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Short Video</h2>

      {isEditing ? (
        <input
          type="text"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Enter video URL"
        />
      ) : (
        <div className="mt-4">
          {video.includes("youtube.com") || video.includes("youtu.be") ? (
            // Hiển thị video từ YouTube
            <iframe
              className="w-full aspect-video rounded-md"
              src={video.replace("watch?v=", "embed/")}
              title="Short Video"
              allowFullScreen
            ></iframe>
          ) : (
            // Hiển thị video trực tiếp từ file (MP4, WEBM, v.v.)
            <video className="w-full rounded-md" controls src={video}></video>
          )}
        </div>
      )}
    </div>
  );
};

export default ShortVideoSection;
