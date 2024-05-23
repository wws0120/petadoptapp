import { useState } from 'react';
import Avatar from './avatar';
import ProfileMenu from './profileMenu';
import { useGetCurrentUser } from '../../../hooks/querys/member';

function NavUserInfo() {
  const [showMenu, setShowMenu] = useState(false);
  const handleProfileClicked = () => {
    setShowMenu(!showMenu);
  };
  const currentUserQuery = useGetCurrentUser();

  const currentUser = currentUserQuery?.data?.data;
  const avatarUrl = currentUser?.imageUrl;
  const email = currentUser?.email;

  return (
    <>
      {' '}
      <Avatar
        avatarUrl={avatarUrl}
        email={email}
        handleProfileClicked={handleProfileClicked}
      />
      <span className="hidden md:block font-semibold">{email}</span>
      {showMenu && (
        <ProfileMenu setShowMenu={setShowMenu} currentUser={currentUser} />
      )}
    </>
  );
}

export default NavUserInfo;
