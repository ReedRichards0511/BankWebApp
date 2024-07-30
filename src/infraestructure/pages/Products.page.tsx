import { ChangeEvent, useEffect, useState } from "react";
import { useGetFinancialProducts } from "../../application/hooks";
import { ButtonComponent, DeleteModalComponent, FinancialProductsTable, HeaderProps, ModalComponent, MoreActionsComponent, NewProductFormComponent, SearchInputComponent } from "../components";

export const ProductsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [productSelected, setProductSelected] = useState();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { financialProducts, isLoadingFinancialProducts, isErrorFinancialProducts, refetchFinancialProducts } = useGetFinancialProducts();

    const openModal = () => {
        setIsModalOpen(true)

    };
    const closeModal = () => {
        setIsModalOpen(false);
        setProductSelected(undefined)
    }

    const handleOpenModalEdit = (row: any) => {
        setProductSelected(row);
        setIsModalOpen(true);
    }
    const handleOpenModalDelete = (row: any) => {
        setProductSelected(row);
        setIsOpenDeleteModal(true);
    }

    useEffect(() =>{
        refetchFinancialProducts()
    }, [isOpenDeleteModal, isModalOpen])

    const filteredProducts = financialProducts?.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const financialProductsHeaders: HeaderProps[] = [
        {
            title: 'Logo',
            render: (row: any) => (
                <div className="flex justify-center">
                    <img className="rounded-full w-12 h-15 " src={row?.logo} alt="image description" />
                </div>
            )
        },
        {
            title: 'Nombre del producto',
            key: 'name',
        },
        {
            title: 'Descripción',
            key: 'description'
        },
        {
            title: 'Fecha de liberación',
            key: 'date_release'
        },
        {
            title: 'Fecha de reestructuración',
            key: 'date_revision'
        },
        {
            title: '',
            render: (row: any) => (
                <MoreActionsComponent
                    row={row}
                    handleOpenModalEdit={() => handleOpenModalEdit(row)}
                    handleOpenModalDelete={() => handleOpenModalDelete(row)}
                />
            )
        }
    ]
    return (
        <main className="w-full h-full p-10">
            <header className="flex justify-center items-center">
                <h1 className="text-3xl pt-5">Banco</h1>
            </header>
            <div className="flex flex-row justify-between">
                <SearchInputComponent
                    value={searchValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    placeholder="Busqueda por nombre"
                />
                <ButtonComponent
                    title="Agregar"
                    onClick={openModal}
                    type="button"
                    color="primary"
                />
            </div>

            <div className="w-full h-full">
                <FinancialProductsTable
                    data={filteredProducts}
                    isLoading={isLoadingFinancialProducts}
                    isError={isErrorFinancialProducts}
                    headers={financialProductsHeaders}
                />
            </div>
            <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                <NewProductFormComponent product={productSelected} />
            </ModalComponent>
            <ModalComponent isOpen={isOpenDeleteModal} onClose={() => {setIsOpenDeleteModal(false)}}>
                <DeleteModalComponent product={productSelected} onClose={() => {setIsOpenDeleteModal(false)}}/>
            </ModalComponent>
        </main>
    );
};
