import Image from "next/image";
import Link from "next/link";

interface CardProps {
  src: string;
  href: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ src, href, title, description }) => {
  return (
    <div className="bg-black/30 hover:bg-black/40 transition-all rounded-lg border border-black/10 p-3 min-h-[220px]">
      <div className="flex justify-between mb-2">
        <Image
          src={src}
          alt={title}
          width={40}
          height={40}
          className="rounded-md"
        />
        <Link
          href={href}
          className="bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold text-white text-opacity-90 hover:text-opacity-100 transition-all px-4 py-1 h-min"
        >
          Attend
        </Link>
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm font-semibold text-white text-opacity-80 text-ellipsis overflow-hidden">
        {description}
      </p>
    </div>
  );
};

export default Card;
