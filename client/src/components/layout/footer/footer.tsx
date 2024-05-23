import React from 'react';
import { Icon } from '@iconify/react';
import { NAVLINKS, SECTIONLINKS } from '../../../configs/constants';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative bg-orange-50 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              Stay Connected!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Fellow us on social platforms.
            </h5>
            <div className="flex mt-6 lg:mb-0 mb-6">
              <button
                className="flex bg-white shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <Icon className=" w-6 h-6" icon="devicon:facebook" />
              </button>
              <button
                className="flex bg-white shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <Icon
                  className="text-[#24e578] w-6 h-6"
                  icon="fa6-brands:square-whatsapp"
                />
              </button>
              <button
                className="flex bg-white shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <Icon className=" w-6 h-6" icon="skill-icons:instagram" />
              </button>
              <button
                className="flex bg-white shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <Icon className=" w-6 h-6" icon="skill-icons:twitter" />
              </button>
            </div>
          </div>
          <div className="w-full  justify-end items-start lg:w-6/12 px-4">
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-4/12 pb-4 md:ml-auto">
                <span className="block uppercase text-grey-800 text-sm font-semibold mb-2">
                  Quick Links
                </span>
                <ul className="">
                  {NAVLINKS.map((link) => {
                    return (
                      <li>
                        <Link
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          to={link.path}
                        >
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full md:w-4/12">
                <span className="block uppercase text-black text-sm font-semibold mb-2">
                  Section Links
                </span>
                <ul className="">
                  {SECTIONLINKS.map((link) => {
                    return (
                      <li>
                        <a
                          className="text-slate-600 hover:text-slate-800 font-semibold block pb-2 text-sm"
                          href={link.path}
                        >
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-grey-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <span className="text-slate-700"> Lorem Ipsum by </span>
              <span className="text-slate-700">Doloremque</span>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
