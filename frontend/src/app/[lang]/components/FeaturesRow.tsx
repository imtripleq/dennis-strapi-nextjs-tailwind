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
    title: string;
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
    <div className="flex flex-col p-4 max-w-xs mx-auto my-4">
      {imageUrl && (
        <div className="w-full h-48">
          <Image
            src={fullImageUrl}
            alt={alternativeText || "Feature image"}
            width={width}
            height={height}
            className="object-cover w-full h-full border border-black"
          />
        </div>
      )}
      <h3 className="mt-4 text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
      {showLink && url && text && (
        <div className="mt-4">
          <Link
            href={url}
            target={newTab ? "_blank" : "_self"}
            className="inline-block px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark"
          >
            {text}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function FeaturesRow({ data }: FeaturesProps) {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="container mx-auto max-w-screen-xl py-4 space-y-2 text-black">
        <h2 className="text-3xl">{data.title}</h2>
        <p className="text-black">{data.description}</p>
      </div>
      <div className="container mx-auto max-w-screen-xl my-6 grid justify-center gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
