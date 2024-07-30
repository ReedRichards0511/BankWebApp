
export const TableskeletonComponent = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <th scope="col" className="px-6 py-3">
              <div className="h-6 w-24 bg-gray-200 animate-pulse"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="h-6 w-48 bg-gray-200 animate-pulse"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="h-6 w-full bg-gray-200 animate-pulse"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="h-6 w-24 bg-gray-200 animate-pulse"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="h-6 w-24 bg-gray-200 animate-pulse"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="h-6 w-24 bg-gray-200 animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6}>
              <div className="flex flex-col gap-4 animate-pulse">
                <div className="h-6 w-full bg-gray-200"></div>
                <div className="h-6 w-full bg-gray-200"></div>
                <div className="h-6 w-full bg-gray-200"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
