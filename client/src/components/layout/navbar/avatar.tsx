function Avatar({ avatarUrl, email, handleProfileClicked }) {
  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleProfileClicked}
          className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          {avatarUrl && avatarUrl ? (
            <img className="h-8 w-8 rounded-full" src={avatarUrl} alt="" />
          ) : (
            <>
              <div className="h-8 w-8 flex items-center justify-center  rounded-full bg-blue-800">
                <span className="text-white text-center text-lg font-bold uppercase">
                  {email ? Array.from(email)[0] : null}
                </span>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default Avatar;
