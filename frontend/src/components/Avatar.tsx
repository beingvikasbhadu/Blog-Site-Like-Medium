export const Avatar = ({ text,onClick }: { text:string,onClick: () => void }) => {
  return (
    <div
      className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600"
      onClick={onClick}
    >
      <span className="font-homo font-medium text-gray-600 dark:text-gray-300">JL</span>
    </div>
  );
};
