import CategoryItem from './categoryItem';

import image001 from '../../assets/category001.webp';
import image002 from '../../assets/category002.webp';
import image003 from '../../assets/category003.webp';
import image004 from '../../assets/category004.webp';
import image005 from '../../assets/category005.webp';

const categories = [
  {
    title: 'Dog',
    img: image001,
    path: '/animals?categories=dog',
  },
  {
    title: 'Cat',
    img: image002,
    path: '/animals?categories=cat',
  },
  {
    title: 'Small Mammal',
    img: image003,
    path: '/animals?categories=small_mammal',
  },
  {
    title: 'Bird',
    img: image004,
    path: '/animals?categories=bird',
  },
  {
    title: 'Reptile',
    img: image005,
    path: '/animals?categories=reptile',
  },
];

function Category() {
  return (
    <div id="categories" className="bg-stone-100 max-container section-padding">
      <div className="  flexCenter ">
        <div>
          <div className="mx-auto mb-5 text-center md:mb-8 md:max-w-xl lg:mb-12 lg:max-w-3xl xl:max-w-[1000px]">
            <div className="flexCenter mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
              Choose your cherished friend
            </div>
            <p className="font-light text-gray-500  sm:text-xl">
              Whether it's dogs, cats, or birds, these gentle souls are here to
              enrich your life. Start this meaningful journey today!
            </p>
          </div>
          <div className="w-full grid gap-2 grid-cols-2 sm:gap-[1.875rem] md:grid-cols-3 lg:grid-cols-5 ">
            {categories.map((category, i) => {
              return <CategoryItem key={i} item={category} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
