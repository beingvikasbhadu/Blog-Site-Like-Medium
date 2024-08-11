export const FullBlogSkeleton = () => {
  return (
    <div className="mt-5 flex flex-col items-center w-full h-lvh ">
      <div className="flex justify-center w-full ">
        <div className="w-5/6  h-10 mt-6  rounded-md bg-gray-300"></div>
      </div>
      <div className="flex justify-start  items-center w-1/2 mt-10 mb-14 ">
        <div>
          <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className=" dark:text-gray-300"></span>
          </div>
        </div>
        <div className="ml-4 flex flex-col justify-between ">
          <div className="mb-4">
            <div className="bg-gray-300 w-24 h-3 rounded-md"></div>
          </div>
          <div className="flex">
            <div className="bg-gray-300 w-12 h-2 mr-5 rounded-md"></div>
            <div className="bg-gray-300 w-12 h-2 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 w-5/6 h-1/2 rounded-md"></div>
    </div>
  );
};
