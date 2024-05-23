import React from 'react';

function roleMenu() {
  const roles = [];
  return (
    <div className="absolute left-[-10rem] z-20 w-48 mt-2 overflow-hidden origin-top-right bg-white border border-inherit rounded-md shadow-xl ">
      {roles.map((item) => (
        <EditMenuItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          action={item.action}
        />
      ))}
    </div>
  );
}

export default roleMenu;
