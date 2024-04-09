import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between mx-4 my-2">
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
            stroke-Linecap="round"
            stroke-Linejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
          />
        </svg>
      </Link>
      <div className="flex items-center gap-4 text-sm font-bold text-white text-opacity-80">
        <Link href="/explore" className="flex items-center gap-1">
          <span className="">Explore Events</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                stroke-Linecap="round"
                stroke-Linejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>
        </Link>
        <Link
          href="/auth/signin"
          className="bg-white/10 rounded-full px-3 py-1"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
