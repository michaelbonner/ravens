/* eslint-disable @next/next/no-img-element */
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";

const ServiceCard = ({ service, number, summary }) => (
  <Link href={`/service/${service.slug?.current}`}>
    <a className="service-card">
      <div className="service-card-image">
        {service.thumb && (
          <img
            alt=""
            src={urlForSanitySource(service.thumb).width(750).url()}
          />
        )}
      </div>
      <p className="service-number">
        Service {String(number).padStart(2, "0")}
      </p>
      <h3>{service.title}</h3>
      <div className="service-description">
        <BlockContent blocks={summary} />
      </div>
      <span className="service-card-link">
        Explore service <span aria-hidden="true">↗</span>
      </span>
    </a>
  </Link>
);

export default ServiceCard;
