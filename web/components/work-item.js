/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";

const WorkItem = ({ project }) => {
  if (!project) return null;
  return (
    <Link href={`/work/${project.slug.current}`}>
      <a className="work-tile">
        <div className="work-tile-image">
          {project.poster && (
            <img
              alt=""
              src={urlForSanitySource(project.poster).width(1200).url()}
            />
          )}
        </div>
        <div className="work-tile-meta">
          <div>
            {project.clientName && <p>{project.clientName}</p>}
            <h2>{project.title}</h2>
          </div>
          <span className="work-tile-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </a>
    </Link>
  );
};
export default WorkItem;
