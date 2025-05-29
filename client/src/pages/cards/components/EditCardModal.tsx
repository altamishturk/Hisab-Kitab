import React, { useState } from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../utils';

export function EditCardModal({cardToEdit,setCardToEdit,setCards}:any) {
            const editCardForm = useForm({
                defaultValues: {
                    yourName: cardToEdit.name,
                    giverName: cardToEdit.giftGiverInfo.name,
                    giverVillage: cardToEdit.giftGiverInfo.village
                }
            });
            const [isSubmiting, setIsSubmiting] = useState(false);


            const handleSubmit = async (data:any) => {
                        try {
                            setIsSubmiting(() => true);
                            const response = await axiosInstance.put(`/cards/${cardToEdit._id}`,data);
                            
                            setCards((prev:any) => {
                                return prev.map((card:any) => card._id === response.data.card._id? response.data.card:card)
                            });
                            setCardToEdit(null);
                        } 
                        catch (error:any) {
                            console.log(error);
                            console.error(error?.response?.data?.message || error?.message);
                        }
                        finally {
                            setIsSubmiting(() => false);
                        }
            }


    return <Modal title="Edit Card" onClose={() => {setCardToEdit(null)}}>          
                    <form className='flex flex-col gap-2 max-w-full w-[500px]'>
                        <input readOnly {...editCardForm.register('yourName')} className='border p-2 rounded-md' placeholder='Your Name...'/>
                        <input {...editCardForm.register('giverName')} className='border p-2 rounded-md' placeholder='Guest Name...'/>
                        <input {...editCardForm.register('giverVillage')} className='border p-2 rounded-md' placeholder='Guest Village...'/>
                    
                        <button onClick={editCardForm.handleSubmit((data) => handleSubmit(data))} className='mt-6 bg-blue-600 text-white p-2 rounded-md'>{isSubmiting? "Saving..":"Save Changes"}</button>
                    </form>
            </Modal>  
}
