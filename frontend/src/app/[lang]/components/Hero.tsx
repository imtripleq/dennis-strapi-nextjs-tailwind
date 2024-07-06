import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import BlockRendererClient from "./BlockRendererClient";
import HighlightedText from "./HighlightedText";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description?: string;
    heroRichText: Array<any>;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

  return (
    <section className="bg-white text-gray-900 w-full">
      <div className="flex flex-col lg:flex-row h-96 lg:h-[600px] overflow-hidden">
        <div className="flex flex-col justify-center p-6 lg:w-1/3 bg-primary text-white h-full">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-5xl leading-none mb-8 font-din sm:text-2xl"
            color="dark:text-violet-400"
          />
          <div className="tmt-6 mb-8 text-lg sm:mb-12">
            <BlockRendererClient content={data.heroRichText} />
          </div>
          {data.description && (
            <HighlightedText
              text={data.description}
              tag="p"
              className="mb-8 text-lg sm:mb-12"
              color="dark:text-violet-400"
            />
          )}
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:w-2/3 h-full">
          <Image
            src={imgUrl || ""}
            alt={
              data.picture.data.attributes.alternativeText || "none provided"
            }
            className="object-cover w-full h-full"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
