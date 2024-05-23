const CategoryBadges = ({ categories }) => {
  return (
    <div className="w-full mt-4 md:mt-6 pt-4 md:pt-6 flex flex-row items-start border-t border-border-200 border-opacity-60">
      <span className="text-sm font-semibold text-heading capitalize mr-6 py-1">
        categories
      </span>
      <div className="flex flex-row flex-wrap">
        {categories?.map((category) => (
          <button className="lowercase text-sm text-heading tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-border-200 rounded mr-2 mb-2 transition-colors hover:border-accent hover:text-accent focus:outline-none focus:bg-opacity-100">
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBadges;
