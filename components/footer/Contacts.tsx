import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";

interface Props {
  title: string;
}

export default function Contacts({ title }: Props) {
  return (
    <div className="flex flex-col items-center space-y-3 md:items-start">
      <h3 className="text-background font-serif font-medium">{title}</h3>

      <a
        href="mailto:info@persianissimo.it"
        className="text-background/80 flex items-center space-x-2"
      >
        <EnvelopeSimpleIcon size={18} />
        <span>info@persianissimo.it</span>
      </a>

      <a
        href="tel:+1234567890"
        className="text-background/80 flex items-center space-x-2"
      >
        <PhoneIcon size={18} />
        <span>(+39) 123 4567 890</span>
      </a>

      <div className="text-background/80 flex items-center space-x-2">
        <MapPinIcon size={18} className="shrink-0" />
        <span>Via Lazzaro Papi, 19, 20129 Milano MI</span>
      </div>
    </div>
  );
}
