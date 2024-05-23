import React from 'react';
import notfoundimg from '../assets/404.webp';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <img className="max-w-96 max-h-96" src={notfoundimg} />
          </div>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 ">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link to="/" className="button-base button-primary">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
