import { Link, useLocation } from 'react-router-dom';
import { NAVLINKS } from '../../../configs/constants';
import { clsx } from 'clsx';

function MobileNav() {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {NAVLINKS.map((item, index) => {
          return (
            <Link
              to={item.path}
              className={clsx(
                'uppercase block rounded-md border-b-2 px-3 py-2 text-base text-center font-semibold'
              )}
              key={index}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNav;
