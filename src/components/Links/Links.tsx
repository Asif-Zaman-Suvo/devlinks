import React from "react";

const Links = () => {
  return (
    <div className="bg-[#943434] px-4 sm:px-6 pb-6">
      <div className="bg-[#943434] grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mobile mockups - hidden on smaller screens */}
        <div className="hidden md:block md:col-span-5 py-10 bg-white">
          <div className="relative mx-auto border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px]">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-light.png"
                className="w-[272px] h-[572px]"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Content section - full width on smaller screens */}
        <div className="col-span-1 md:col-span-7 bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Links Section</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            consequatur, distinctio minus, ipsum debitis labore odit dolore
            eligendi sequi sint ut tenetur inventore nulla, adipisci harum
            similique autem quisquam provident.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            consequatur, distinctio minus, ipsum debitis labore odit dolore
            eligendi sequi sint ut tenetur inventore nulla, adipisci harum
            similique autem quisquam provident.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;
