export const AppBarSkelton = () => {
  return (
    <div className="mb-6 flex flex-col items-end w-full">
      <div className="m-2 flex justify-between items-center p-3 w-full h-10">
        <div className="font-homo font-extrabold text-3xl h-6 w-20 bg-gray-300 rounded-md"></div>
        <div>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className="font-homo font-medium text-gray-600 dark:text-gray-300"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
