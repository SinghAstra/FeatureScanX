import { useState } from "react";

const PostImage = ({ image }) => {
  const [isPostImageLoaded, setIsPostImageLoaded] = useState(false);
  return (
    <div className="post-image-slide">
      {/* <img
        src={image.lowResUrl}
        alt="post"
        className="low-res-post-image"
        style={{ opacity: isPostImageLoaded ? 0 : 1 }}
      />
      <img
        src={image.highResUrl}
        alt="post"
        onLoad={() => setIsPostImageLoaded(true)}
        className="high-res-post-image"
        style={{
          opacity: isPostImageLoaded ? 1 : 0,
        }}
      /> */}
    </div>
  );
};

export default PostImage;
