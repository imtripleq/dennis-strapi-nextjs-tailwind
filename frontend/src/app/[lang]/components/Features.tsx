import Link from "next/link";
import Image from "next/image";
import React from "react";
import { renderButtonStyle } from "../utils/render-button-style";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}
interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
    buttons: Button[];
  };
}

interface MediaAttributes {
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
}

interface Media {
  data: {
    id: number;
    attributes: MediaAttributes;
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media: Media;
}

function Feature({
  title,
  description,
  showLink,
  newTab,
  url,
  text,
  media,
}: Feature) {
  const {
    url: imageUrl,
    alternativeText,
    width,
    height,
  } = media?.data?.attributes;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const fullImageUrl = `${baseUrl}${imageUrl}`;

  return (
    <div className="flip-card w-full h-100">
      <div className="flip-card-inner h-full max-w-sm">
        {/* Front */}
        <div className="flip-card-front flex flex-col items-center border border-primary justify-center text-center bg-white">
          <h3 className="m-3 text-lg font-semibold text-primary min-h-[3rem] content-center">
            {title}
          </h3>
          {imageUrl && (
            <div className="my-4 w-full h-48">
              <Image
                src={fullImageUrl}
                alt={alternativeText || "Feature image"}
                width={width}
                height={height}
                className="rounded object-cover w-full h-full"
              />
            </div>
          )}
          <div className="space-y-1 leading-tight my-6 text-black min-h-[4rem]">
            <p>{description}</p>
          </div>
          {showLink && url && text && (
            <div>
              <Link
                href={url}
                target={newTab ? "_blank" : "_self"}
                className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out bg-primary rounded-lg hover:bg-primary-dark"
              >
                {text}
              </Link>
            </div>
          )}
        </div>
        {/* Back */}
        <div className="flip-card-back flex flex-col items-center justify-center text-center bg-gray-300 p-4 rounded-lg">
          <h3 className="m-3 text-lg font-semibold text-white min-h-[3rem]">
            DEMO ONLY
          </h3>
          <p className="text-white">CONTACT DENNIS</p>
        </div>
      </div>
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="bg-gray-100 py-12 lg:py-12">
      <div className="container mx-auto max-w-screen-xl py-4 space-y-2 text-black">
        <h2 className="text-3xl">{data.heading}</h2>
        <p className="text-black">{data.description}</p>
      </div>
      <div className="container mx-auto max-w-screen-xl my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.feature.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
      <div className="flex justify-end mt-24 mr-12">
        {data.buttons.map((button: Button, index: number) => (
          <Link
            key={index}
            href={button.url}
            target={button.newTab ? "_blank" : "_self"}
            className={renderButtonStyle(button.type)}
          >
            {button.text}
            {" >"}
          </Link>
        ))}
      </div>
    </section>
  );
}
