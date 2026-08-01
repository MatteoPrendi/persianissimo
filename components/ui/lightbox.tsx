"use client";

import LightboxComponent from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export interface SlideItem {
  src: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface LightboxProps {
  open: boolean;
  close: () => void;
  index?: number;
  slides: SlideItem[];
}

export default function Lightbox({
  open,
  close,
  index = 0,
  slides,
}: LightboxProps) {
  return (
    <LightboxComponent
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Captions, Thumbnails]}
      thumbnails={{
        width: 120,
        height: 80,
        border: 0,
        padding: 0,
        gap: 12,
        imageFit: "cover",
      }}
      animation={{
        navigation: 300,
        swipe: 250,
        fade: 250,
      }}
      captions={{
        showToggle: false,
        descriptionMaxLines: 0,
      }}
      render={{
        iconClose: () => <XIcon className="yarl__icon" />,
        iconPrev: () => <CaretLeftIcon size={22} weight="bold" />,
        iconNext: () => <CaretRightIcon size={22} weight="bold" />,
      }}
      styles={{
        thumbnail: {
          borderRadius: "0.25rem",
          border: "none",
          padding: 0,
          outline: "none",
          boxShadow: "none",
        },
        navigationPrev: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "0.125rem",
          padding: "8px",
          marginLeft: "16px",
        },
        navigationNext: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "0.125rem",
          padding: "8px",
          marginRight: "16px",
        },
      }}
    />
  );
}
