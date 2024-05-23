interface HeaderProps {
  pageSubHeader?: string;
  pageHeader: string;
  background?: string;
}

const PageHeader: React.FC<HeaderProps> = ({
  pageSubHeader = 'text-page-explore',
  pageHeader = 'text-page-header',
  background = 'https://dummyimage.com/600x400/000/fff',
}) => {
  return (
    <div
      className="flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="absolute top-0 start-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="w-full flex items-center justify-center relative z-10 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-24">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white text-center">
          {`${pageHeader}`}
          <p className=" block text-lg font-normal mt-1 mb-3">{`${pageSubHeader}`}</p>
        </h2>
      </div>
    </div>
  );
};

export default PageHeader;
