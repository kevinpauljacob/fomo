import Link from "next/link";

export default function Footer() {
  const links = [
    {
      name: "Explore",
      href: "/explore",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Coming Soon",
      href: "/coming-soon",
    },
  ];

  const socials = [
    {
      name: "mail",
      href: "mailto:kpjtofficial@gmail.com",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>',
    },
    {
      name: "github",
      href: "https://github.com/kevinpauljacob/fomo",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>',
    },
  ];

  return (
    <div className="w-[1024px] border-t border-white/20 mx-auto mb-5 pt-5">
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4 mb-2">
          <Link href="/" className="flex items-center cursor-pointer">
            <span className="text-xl font-bold">fomo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
          </Link>
          <div className="flex items-center gap-3 text-base font-bold text-white text-opacity-80">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-white text-opacity-80">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: social.svg }}
              ></Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm font-semibold text-white text-opacity-60">
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/security">Security</Link>
      </div>
    </div>
  );
}
