export const RememberMeBox = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            onClick={onClick}
          />
        </div>
        <label className="ms-2 text-sm font-medium font-mono text-gray-900 dark:text-gray-300">
          Remember me
        </label>
      </div>
    </>
  );
};
