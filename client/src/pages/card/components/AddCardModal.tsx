import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../utils/axiosInstance';

export function AddCardModal({setCards,setShowAddCardModal}:any) {
    const createCardForm = useForm({
        defaultValues: {
            yourName: "Altamish",
            giverName: "",
            giverVillage: "",
            spouseName: "Robina",
            reveivedMoney: 0,
            reveivedGave: 0,
        }
    });
    const [, setVillages] = useState([]);

    const handleSubmit = async (data:any) => {
        try {
            const response = await axiosInstance.post("/cards",data);
            // console.log(response.data.card);
            setCards((prev:any) => {
                if(!prev){
                    return [response.data.card]
                }
                return [response.data.card,...prev];
            });
            setShowAddCardModal(false);
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

                <div className="flex mt-4 gap-2 items-end">
                    <div className="flex-1">
                        <input placeholder='Spouse Name...' id='spouseName' type='text' {...createCardForm.register('spouseName')} className='w-full border p-2 rounded-md'/>
                    </div>
                </div>
                <div className="flex mt-4 gap-2 items-end">
                    <div className="flex-1">
                        <label htmlFor="reveivedMoney" className='text-gray-400'>Reveived Money</label>
                        <input id='reveivedMoney' type='number' {...createCardForm.register('reveivedMoney')} className='w-full border p-2 rounded-md'/>
                    </div>
                </div>
                <div className="flex mt-4 gap-2 items-end">
                    <div className="flex-1">
                        <label htmlFor="reveivedGave" className='text-gray-400'>Gave Money</label>
                        <input id='reveivedGave' type='number' {...createCardForm.register('reveivedGave')} className='w-full border p-2 rounded-md'/>
                    </div>
                </div>

                <button onClick={createCardForm.handleSubmit((data) => handleSubmit(data))} className='mt-6 bg-blue-600 text-white p-2 rounded-md'>Create Card</button>
            </form>
        </Modal>
    )
}
