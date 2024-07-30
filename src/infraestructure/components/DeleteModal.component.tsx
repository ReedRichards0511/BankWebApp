import { FC, useState } from "react"
import { Product } from "../../domain"
import { ButtonComponent, ErrorModalComponent, SucessModalComponent } from "../components";
import { useDeleteFinancialProduct } from "../../application/hooks";
interface DeleteModalProps {
    product?: Product
    onClose: () => void
}

export const DeleteModalComponent: FC<DeleteModalProps> = ({ product, onClose }) => {


    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { deleteFinancialProduct, isDeletingFinancialProduct } = useDeleteFinancialProduct();

    const onDeleteProduct = async () => {
        try {
            await deleteFinancialProduct(product?.id!);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    }

    
    if (showSuccessMessage) {
        return <SucessModalComponent title={'Producto eliminado Exitosamente!'} />
    }

    if (showErrorMessage) {
        return <ErrorModalComponent title={ 'Hubo un error al elimnar el producto'} />
    }


    return (
        <div className="h-full w-full flex justify-center flex-col ">
            <h1 className="text-2xl pb-6 text-center">{`¿Esta seguro de eliminar el producto ${product?.name}`}</h1>
            <div className="w-full h-px bg-gray-300"></div>
            <div className="grid grid-cols-2 gap-12 pt-10 w-full">
                <div className="col-span-2 flex justify-center  gap-10">
                    <ButtonComponent
                        color="secondary"
                        title='Cancelar'
                        type="button"
                        onClick={onClose}
                        disabled={isDeletingFinancialProduct}
                    />
                    <ButtonComponent
                        color="primary"
                        title={ isDeletingFinancialProduct ? 'Eliminando...': 'Confirmar'}
                        type="button"
                        onClick={onDeleteProduct}
                        disabled={isDeletingFinancialProduct}
                    />
                </div>
            </div>
        </div>
    )
}