import { FC, useState } from "react";
import { Product } from "../../domain";
import { TableskeletonComponent } from "./TableSkeleton.component";

interface TableComponentProps {
    headers: HeaderProps[];
    isLoading?: boolean;
    data: Product[];
    isError: boolean
}
export interface HeaderProps {
    title: string | React.ReactNode
    key?: string
    render?: (row: any) => React.ReactNode
}


export const FinancialProductsTable = ({ data, isLoading, isError, headers }: TableComponentProps) => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    if (isError) return <h1>Error al traer los productos financieros</h1>;

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
    };

    const displayedData = data?.slice(0, itemsPerPage);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                {
                    isLoading && (
                        <TableskeletonComponent />
                    )
                }
                <TableHeadComponent headers={headers} />
                <tbody>
                    {
                        displayedData?.length === 0 && (
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {
                                        isLoading ? 'Cargando...' : 'No hay datos para mostrar'
                                    }
                                </div>
                            </td>
                        )
                    }
                    {
                        displayedData?.map((item, index) => (
                            <TableRowsComponent headers={headers} index={index} row={item} key={index} />
                        ))
                    }
                </tbody>
            </table>
            <div className="flex justify-between items-center py-4 px-4">
                <span className="text-gray-700"> {data?.length} Registros</span>
                <div>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="border rounded p-1"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};


interface TableHeadComponentProps {
    headers: HeaderProps[]
}

const TableHeadComponent: FC<TableHeadComponentProps> = ({ headers }) => {

    return (
        <thead className="text-base text-center text-gray-700  bg-gray-50">
            <tr>
                {
                    headers.map((headCell, index) => (
                        <th
                            key={index}
                        >
                            {headCell.title}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )

}
interface TableRowsComponentProps {
    row: any
    index: number
    headers: HeaderProps[]
}

const TableRowsComponent: FC<TableRowsComponentProps> = ({ headers, index, row }) => {


    return (
        <tr key={index} className="bg-white border-b hover:bg-gray-50 ">

            {
                headers.map((headCell, index) => (
                    <td className="px-6 py-4 text-center text-gray-500" key={index}>
                        {headCell.render ? headCell.render(row) : row[headCell.key!]}
                    </td>
                ))
            }
        </tr>
    )

} 