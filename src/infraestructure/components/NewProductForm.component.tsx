import { useForm } from "react-hook-form";
import { ButtonComponent, ErrorModalComponent, InputComponent, SucessModalComponent } from "../components";
import { useCreateFinancialProduct, useUpdateFinancialProduct, useVerifyID } from "../../application/hooks";
import { Product } from "../../domain";
import { FC, useEffect, useState } from "react";

interface NewProductFormProps {
    product?: Product
}

export const NewProductFormComponent: FC<NewProductFormProps> = ({ product }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues, reset} = useForm<Product>();
    const { createNewProduct, isLoadingCreateProduct } = useCreateFinancialProduct();
    const { updateFinancialProduct, isLoadingUpdateFinancialProduct } = useUpdateFinancialProduct();



    useEffect(() => {
        reset({
            id: product?.id ?? '',
            name: product?.name ?? '',
            logo: product?.logo ?? '',
            description: product?.description ?? '',
            date_release: product?.date_release,
            date_revision: product?.date_revision
        })
    }, [product, reset])




    const onSubmit = async (data: Product) => {
      
        try {
            if (!product) {
                await createNewProduct(data);
                setShowSuccessMessage(true);
                reset();
                return;
            }
            await updateFinancialProduct(data);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    };

    if (showSuccessMessage) {
        return <SucessModalComponent title={!product ? 'Producto Creado Exitosamente!' : 'Producto actualizado Exitosamente!'} />
    }

    if (showErrorMessage) {
        return <ErrorModalComponent title={!product ? 'Hubo un error al crear el nuevo producto' : 'Hubo un error al actualizar el nuevo producto'} />
    }


    return (
        <div className="h-full w-full flex justify-center flex-col ">
            <h1 className="text-2xl pb-6 text-center">Formulario de Registro</h1>
            <div className="w-full h-px bg-gray-300"></div>
            <form className="grid grid-cols-2 gap-12 pt-10 w-full " onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    label="ID"
                    {...register('id', {
                        required: 'Este campo es requerido',
                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                        maxLength: {
                            value: 10, message: 'Máximo 10 caracteres'
                        },
                    })}
                    error={errors.id?.message}
                    disabled={!!product?.id}
                />
                <InputComponent
                    label="Nombre"
                    {...register('name', {
                        required: 'Este campo es requerido',
                        minLength: { value: 5, message: 'Mínimo 5 caracteres' },
                        maxLength: {
                            value: 100, message: 'Máximo 100 caracteres'
                        },
                    })}
                    error={errors.name?.message}
                />
                <InputComponent
                    label="Descripción"
                    {...register('description', {
                        required: 'Este campo es requerido',
                        minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                        maxLength: {
                            value: 200, message: 'Máximo 200 caracteres'
                        },
                    })}
                    error={errors.description?.message}
                />
                <InputComponent
                    label="Logo"
                    {...register('logo', {
                        required: 'Este campo es requerido',
                    })}
                    error={errors.logo?.message}

                />
                <InputComponent
                    label="Fecha de Liberación"
                    type="date"
                    {...register('date_release', {
                        required: 'Este campo es requerido',
                        validate: (value) => {
                            const fechaSeleccionada = new Date(value);
                            const fechaActual = new Date();
                            return fechaSeleccionada >= fechaActual || 'La fecha debe ser igual o mayor a la fecha actual';
                        }
                    })}
                    error={errors.date_release?.message}
                />
                <InputComponent
                    label="Fecha de Revisión"
                    type="date"
                    {...register('date_revision', {
                        required: 'Este campo es requerido',
                        validate: (value) => {
                            const fechaLiberacion = new Date(getValues('date_release'));
                            const fechaRevision = new Date(value);
                            fechaLiberacion.setFullYear(fechaLiberacion.getFullYear() + 1);
                            return (
                                fechaRevision.getTime() === fechaLiberacion.getTime() ||
                                'La fecha debe ser exactamente un año después de la fecha de liberación'
                            );
                        },
                    })}
                    error={errors.date_revision?.message}
                />
                <div className="col-span-2 flex justify-center  gap-10">
                    <ButtonComponent
                        color="secondary"
                        title='Reiniciar'
                        type="reset"
                        disabled={isLoadingCreateProduct || isLoadingUpdateFinancialProduct}
                    />
                    <ButtonComponent
                        color="primary"
                        title={(isLoadingCreateProduct || isLoadingUpdateFinancialProduct) ? 'Creando...' : 'Enviar'}
                        type="submit"
                        disabled={isLoadingCreateProduct || isLoadingUpdateFinancialProduct}
                    />
                </div>
            </form>
        </div>
    )
}