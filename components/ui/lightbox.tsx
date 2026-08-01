"use client";

import LightboxComponent from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

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
      plugins={[Captions]}
      captions={{
        showToggle: false,
        descriptionMaxLines: 0,
      }}
    />
  );
}
