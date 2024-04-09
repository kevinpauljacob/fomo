export default function SignIn() {
  return (
    <main className="flex items-center justify-center h-[calc(100vh-141px)] max-w-[640px] mx-auto">
      <div className="w-[350px] bg-black/10 border border-white/10 rounded-lg px-5 py-7">
        <div></div>
        <h1 className="text-2xl text-white font-semibold">Welcome to Fomo</h1>
        <p className="text-sm text-white text-opacity-80 font-semibold mt-1">
          Please sign in or sign up below
        </p>
        <form>
          <div className="flex flex-col my-3">
            <label
              htmlFor="email"
              className="text-sm text-white text-opacity-80 font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm text-white text-opacity-80 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
            />
          </div>
          <button className="bg-white text-black font-bold text-md hover:bg-white/80 transition-all w-full rounded-lg p-2 mt-5">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
