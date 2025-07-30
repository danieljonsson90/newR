import Link from 'next/link';
import { Button } from './ui/button';

type CustomTableProps = {
  rows: { id: number; values: (string | number | undefined)[] }[];
  columns: string[];
  openModal: (rowIndex: number) => void;
  type: string;
};

export function CustomTable({
  rows,
  columns,
  openModal,
  type,
}: CustomTableProps) {
  return (
    <>
      <div className="overflow-x-auto  sm:rounded-lg">
        <table className=" divide-y divide-gray-200 shadow-md p-4">
          <thead className="">
            <tr>
              {columns?.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((_, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {index === 0 ? (
                      <div className="font-medium text-gray-900">
                        {row.values[index]}
                      </div>
                    ) : (
                      <div className="text-gray-500">{row.values[index]}</div>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/${type}/update/${row?.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </Link>
                  <Button
                    onClick={() => openModal(rowIndex)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md t focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
