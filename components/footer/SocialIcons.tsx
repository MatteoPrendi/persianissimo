import {
  InstagramLogoIcon,
  FacebookLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

const SOCIALS = [
  {
    id: 1,
    href: "https://www.instagram.com/dalpersianissimo/",
    Logo: InstagramLogoIcon,
  },
  { id: 2, href: "#", Logo: FacebookLogoIcon },
  { id: 3, href: "#", Logo: TwitterLogoIcon },
];

interface Props {
  title: string;
}

export default function SocialIcons({ title }: Props) {
  return (
    <div className="flex flex-col items-center space-y-3 md:items-start">
      <h3 className="text-background font-serif font-medium">{title}</h3>

      <div className="flex space-x-5">
        {SOCIALS.map(({ id, href, Logo }) => (
          <Link
            key={id}
            href={href}
            target="_blank"
            className="text-background/80 transition-colors hover:text-blue-500"
          >
            <Logo size={22} />
          </Link>
        ))}
      </div>
    </div>
  );
}
