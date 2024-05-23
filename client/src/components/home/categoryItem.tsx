import { Link } from 'react-router-dom';
import image001 from '../../assets/category001.webp';
import image002 from '../../assets/category002.webp';
import image003 from '../../assets/category003.webp';
import image004 from '../../assets/category004.webp';
import image005 from '../../assets/category005.webp';

function CategoryItem({ item }) {
  return (
    <div key={item.id}>
      <div className="border-gray-100 rounded-2.5xl block border rounded-[0.625rem] bg-white p-[1.1875rem] transition-shadow hover:shadow-lg hover:bg-orange-50 hover:border-orange-300">
        <figure className="relative">
          <Link to={item.path}>
            <img
              src={item.img}
              alt="item 5"
              className="w-full h-[150px] rounded-[0.625rem] object-contain"
            />
          </Link>
        </figure>
        <div className="mt-2 flex items-center justify-center">
          <Link to={`/item/#`}>
            <div className="text-center text-base font-bold sm:text-lg text-gray-500">
              {item.title}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
