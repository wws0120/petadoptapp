import { Icon } from '@iconify/react';
import { useState } from 'react';
import { ADOPTIONRECORDSTATUS } from '../../configs/constants';
import { useGetAdoptionById } from '../../hooks/querys/adoption';
import { useParams } from 'react-router-dom';
import { calculateAge } from '../../utils/helper';

const AdoptionDetail = () => {
  const { id } = useParams();
  const getApotionRecordQuery = useGetAdoptionById(id);
  const [currentStatus, setCurrentStatus] = useState('');
  const adoptionRecord = getApotionRecordQuery?.data?.data;

  return (
    <>
      {adoptionRecord && (
        <div className="mx-auto p-6 sm:p-10 space-y-6 min-h-[calc(100vh-138px)]  relative pb-14 ">
          <div className="flex justify-start item-start space-y-2 flex-col ">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row  mb-2">
                <div className="mr-24">
                  <h3 className="text-xl lg:text-2xl font-semibold leading-7 lg:leading-9  text-gray-800">
                    Record Id
                  </h3>
                  <div className="text-base lg:text-lg">
                    {adoptionRecord.id}
                  </div>
                </div>
                <div>
                  <div className="inline-block py-1 px-4 text-xs font-semibold border-0 rounded-2xl mt-2 md:mt-0 bg-cyan-100 text-cyan-600 ">
                    {adoptionRecord.status}
                  </div>
                  <div className=" w-60">
                    <select
                      onChange={(event) => setCurrentStatus(event.target.value)}
                      name="adoptionStatus"
                    >
                      <option value="">Select a status</option>
                      {Object.values(ADOPTIONRECORDSTATUS).map((status) => (
                        <option value={status} key={status}>
                          {currentStatus}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <span className="flex items-center text-gray-700">
                <Icon className="w-4 h-4 " icon="lucide:calendar" />
                <span className="ml-2">Fri 04-Mar-2022, 08:15 PM</span>
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="bg-gray-50 w-full xl:w-2/4 flex justify-between items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Adopter
              </h3>
              <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex flex-col md:flex-row justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img
                      className="px-1 sm:px-4 w-full mb-4 md:h-36 md:w-36 md:px-0 "
                      src={adoptionRecord.adopter.imageUrl}
                      alt="avatar"
                    />
                    <div className=" flex justify-start items-start flex-col space-y-2">
                      <p className="text-base font-semibold leading-4 text-left text-gray-800">
                        {adoptionRecord.adopter.name}
                      </p>
                      <p className="text-sm leading-5 text-gray-600">
                        {adoptionRecord.adopter.email}
                      </p>
                    </div>
                  </div>

                  <div className="py-4 border-b border-gray-200 w-full">
                    <div className="my-5">
                      <div className="flex items-center w-full gap-2 mb-4">
                        <Icon
                          className="h-6 w-6"
                          icon="fluent:mail-20-filled"
                        />
                        <span className="font-semibold">
                          {adoptionRecord.adopter.email}
                        </span>
                      </div>
                    </div>
                    <div className="my-5">
                      <div className="flex items-center w-full gap-2 mb-4">
                        <Icon className="h-6 w-6" icon="basil:phone-solid" />
                        <span className="font-semibold">7000 0000</span>
                      </div>
                    </div>
                    <div className="my-5">
                      <div className="flex items-center w-full gap-2 mb-4">
                        <Icon className="h-6 w-6" icon="dashicons:whatsapp" />
                        <span className="font-semibold">+8528778627030</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start flex-shrink-0 py-8 ">
                  <div className="flex justify-start  items-start flex-col  space-y-4 ">
                    <h6 className="text-xl font-semibold leading-5 text-gray-800 mb-2">
                      Address
                    </h6>
                    <address className="not-italic">
                      <div className="mb-1">100 Main ST</div>
                      <div className="mb-1">PO Box 1022</div>
                      <div className="mb-1">Seattle WA 98104</div>
                      <div>United States of America</div>
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full xl:w-2/4 space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                  Animal
                </p>
                <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src={adoptionRecord.animal.gallery[0]}
                      alt="animal"
                    />
                    <img
                      className="w-full md:hidden"
                      src={adoptionRecord.animal.gallery[0]}
                      alt="aniaml"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                        {adoptionRecord.animal.name}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="leading-none text-gray-800">
                          <span className="text-gray-500 mr-1">Age: </span>{' '}
                          {calculateAge(adoptionRecord.animal.dateOfBirth)}
                        </p>
                        <p className="leading-none text-gray-800">
                          <span className="text-gray-500 mr-1">Sex: </span>{' '}
                          {adoptionRecord.animal.sex}
                        </p>
                        <p className="leading-none text-gray-800">
                          <span className="text-gray-500 mr-1">Breed: </span>{' '}
                          {adoptionRecord.animal.breed}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col items-stretch w-full">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                    Admin Notes
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <textarea className="p-2 w-full"></textarea>
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                      <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                        Update Notes
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                    Shipping
                  </h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-8">
                        <img
                          className="w-full h-full"
                          alt="logo"
                          src="https://i.ibb.co/L8KSdNQ/image-3.png"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 font-semibold text-gray-800">
                          DPD Delivery
                          <br />
                          <span className="font-normal">
                            Delivery with 24 Hours
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 text-gray-800">
                      $8.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdoptionDetail;
