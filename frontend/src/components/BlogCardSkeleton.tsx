export const BlogCardSkeleton=()=>{
    return(
        <div className="flex flex-col items-center w-full">
        <div className="m-4 w-5/12  cursor-pointer grid grid-rows-6">
          <div className="flex row-span-1 items-center">
            <div className="mr-2 relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
              <span className="font-homo font-medium text-xs text-gray-600 dark:text-gray-300"></span>
            </div>
            <div className="font-homo text-sm h-2 w-12 bg-gray-300 rounded-md"></div>
          </div>
          <div className="row-span-4 grid grid-rows-4 ">
            <div className="text-2xl my-3 font-extrabold font-mono row-span-1  bg-gray-300 rounded-md"></div>
            <div className="font-homo text-gray-600 row-span-3  bg-gray-300  rounded-md"></div>
          </div>
          <div className="flex items-center my-4 row-span-1  ">
            <div className="bg-gray-300 h-3 w-3 rounded-lg"></div>
            <div className="ml-2 font-homo text-sm w-2/12 h-3 rounded-md bg-gray-300 "></div>
          </div>
          <div className="h-px w-full bg-gray-200 "></div>
        </div>
      </div>
    )
}