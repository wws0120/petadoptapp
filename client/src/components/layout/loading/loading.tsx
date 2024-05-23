const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-opacity-90 bg-slate-400 z-50">
      <div aria-label="Loading..." role="status">
        <svg
          width={24}
          height={24}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin w-14 h-14 stroke-orange-600"
        >
          <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
        </svg>
      </div>

      <p className="text-cyan-50 mt-2">Loading...</p>
    </div>
  );
};

export default Loading;
