import {
  InstagramLogoIcon,
  FacebookLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react/ssr";

const SOCIALS = [
  {
    href: "https://www.instagram.com/dalpersianissimo/",
    Logo: InstagramLogoIcon,
  },
  { href: "#", Logo: FacebookLogoIcon },
  { href: "#", Logo: TwitterLogoIcon },
];

export default function SocialIcons() {
  return (
    <div className="flex flex-col items-center space-y-3 md:items-start">
      <h3 className="text-background font-serif font-medium">Seguici</h3>

      <div className="flex space-x-5">
        {SOCIALS.map(({ href, Logo }) => (
          <a
            href={href}
            target="_blank"
            className="text-background/80 transition-colors hover:text-blue-500"
          >
            <Logo size={22} />
          </a>
        ))}
      </div>
    </div>
  );
}
