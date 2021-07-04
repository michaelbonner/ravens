import React, { useState } from "react";
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";

const WorkItem = ({ project, gridColumnsCount = 2 }) => {
  const [hovered, setHovered] = useState(false);
  let aspectHeight = `lg:aspect-h-4`;
  if (gridColumnsCount > 1) {
    aspectHeight = `lg:aspect-h-6`;
  } else if (gridColumnsCount) {
    aspectHeight = `lg:aspect-h-4`;
  }
  if (!project) {
    return "";
  }
  return (
    <Link href={`/work/${project.slug.current}`}>
      <a
        className={`relative w-full text-right flex justify-end items-end transition-all duration-500 aspect-w-16 aspect-h-6 ${aspectHeight}`}
        style={{
          background: `url(${urlForSanitySource(project.poster)
            .width(1200)
            .url()}) center center no-repeat`,
          backgroundSize: hovered ? "100%" : "105%",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`bg-transparent hover:bg-black absolute py-2 px-4 ease-out ${
            hovered ? `opacity-70` : `opacity-0`
          } inset-0 transition-all duration-300`}
        >
          <h2
            className={`absolute inset-y-4 inset-x-8 border-2 border-black hover:border-gold flex items-center justify-center text-3xl uppercase transition-all duration-500`}
          >
            <span
              className={`text-center px-4 py-2 ${
                gridColumnsCount > 2 ? "lg:text-xl xl:text-2xl" : "text-2xl"
              }`}
            >
              {project.clientName ? `${project.clientName} // ` : ""}
              {project.title}
            </span>
          </h2>
        </div>
      </a>
    </Link>
  );
};
export default WorkItem;
