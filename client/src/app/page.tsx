import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="flex max-w-[1024px] h-[calc(100vh-141px)] mx-auto">
        <div className="flex flex-col justify-center w-[35%] h-full">
          <h1 className="flex items-center">
            <span className="text-3xl font-bold">fomo</span>
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
                stroke-Linejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
          </h1>
          <p className="flex flex-col text-6xl font-semibold my-5">
            <span>Your ticket</span>
            <span>to endless</span>
            <span className="bg-gradient-to-r from-[#9bc5c3] to-[#fbed96] text-transparent bg-clip-text">
              excitement!
            </span>
          </p>
          <p className="text-xl">
            Set up an event page, invite friends and sell tickets. Host a
            memorable event today.
          </p>
          <Link
            href="/auth/signin"
            className="bg-white text-black font-semibold text-lg rounded-lg w-max px-4 py-2 mt-8"
          >
            Create Your First Event
          </Link>
        </div>
        <div className="w-[65%]"></div>
      </section>
    </main>
  );
}
