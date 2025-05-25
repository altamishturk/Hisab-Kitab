import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../utils/axiosInstance';

export function AddCardModal({setCards,setShowAddCardModal}:any) {
    const createCardForm = useForm({
        defaultValues: {
            yourName: "Altamish",
            giverName: "",
            giverVillage: ""
        }
    });
    const [, setVillages] = useState([]);

    const handleSubmit = async (data:any) => {
        try {
            const response = await axiosInstance.post("/cards",data);
            // console.log(response.data.card);
            setCards((prev:any) => {
                return [response.data.card,...prev];
            })
        } 
        catch (error:any) {
            console.error(error?.response?.data?.message || error?.message);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get("/cards/villages");
  
                setVillages(response.data.villages);
            } 
            catch (error) {
                console.log(error);
                
                setVillages([]);
            }
        })()
    }, []);

    return (
        <Modal title='Add New Card' onClose={() => {setShowAddCardModal(false)}}>
            <form className='flex flex-col gap-2 max-w-full w-[500px]'>
                <input {...createCardForm.register('yourName')} className='border p-2 rounded-md' placeholder='Your Name...'/>
                <input {...createCardForm.register('giverName')} className='border p-2 rounded-md' placeholder='Guest Name...'/>
                <input {...createCardForm.register('giverVillage')} className='border p-2 rounded-md' placeholder='Guest Village...'/>
                {/* <select {...createCardForm.register("giverVillage", { required: "Please select a Village" })} className='border p-2 rounded-md'>
                    <option value="">-- Select Village --</option>
                    {
                        villages?.map((vill,idx) => <option key={idx} value={vill}>{vill}</option>)
                    }
                </select> */}
                <button onClick={createCardForm.handleSubmit((data) => handleSubmit(data))} className='mt-6 bg-blue-600 text-white p-2 rounded-md'>Create Card</button>
            </form>
        </Modal>
    )
}
