import React, { FC, useRef, useState } from "react";

const Img: FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const searchImgRef = useRef<HTMLImageElement>(null);
  const handleBrokenImages = () => {
    if (searchImgRef?.current) {
      searchImgRef.current.src = "/placeholder.svg";
    }
  };
  return (
    <img
      onError={handleBrokenImages}
      ref={searchImgRef as any}
      width="40px"
      height="40px"
      {...props}
    />
  );
};
export default Img;
