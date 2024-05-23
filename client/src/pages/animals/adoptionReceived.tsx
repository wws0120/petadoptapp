import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function AdoptionReceived() {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Icon
              className="w-12 h-12 p-2 inline-block rounded-full bg-green-500 text-white "
              icon="charm:tick"
            />
          </div>
          <div className="mb-4">
            <p className="text-2xl font-semibold md:text-3xl">
              We Received Your Application.
            </p>
            <p className="mt-4 text-slate-800">
              Your application has been successfully submitted!
              <br />
              Our team is now reviewing it, and you'll be contacted within 2-3
              working days for next steps.
              <br />
              Please check your contact details regularly. <br />
              Thank you for choosing adoption!
            </p>
          </div>
          <Link to="/" className="button-base button-primary">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdoptionReceived;
