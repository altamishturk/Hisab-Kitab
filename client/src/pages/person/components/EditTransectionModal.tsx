import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { axiosInstance } from '../../../utils';
import { formatDateForDatetimeLocal } from '../../../utils/formatDateForDatetimeLocal';
import { toast } from 'react-toastify';


interface EditTransectionModalProps {
    setIdToEdit: React.Dispatch<React.SetStateAction<string>>;
    idToEdit: string;
    setBorrowTransacctions: React.Dispatch<React.SetStateAction<any[]|null>>;
}

export function EditTransectionModal({setBorrowTransacctions,idToEdit,setIdToEdit}:EditTransectionModalProps) {
      const form = useForm();
      const isSavingData = form.watch('isSavingData');
      const from = form.watch('from');
    
    
      const handleSubmit = async (data:any) => {
            try {
                form.setValue("isSavingData",true);
                const response = await axiosInstance.put(`/borrow-transactions/${idToEdit}`,data);
    
    
                if(response?.data){
                    setBorrowTransacctions((p:any) => {
                        if(!p){
                            return []
                        }
                        return p.map((tran:any) => tran._id === idToEdit? response.data:tran)
                    });
                    form.setValue("isSavingData",false);
                    setIdToEdit("");
                }
    
            } catch (error) {
                console.log(error);
                form.setValue("isSavingData",false);
            }
      }


      useEffect(() => {
            (async () => {
                try {
                    const response = await axiosInstance.get(`/borrow-transactions/${idToEdit}`);

                    if(response.data){
                        form.setValue("from",response.data.from);
                        form.setValue("amount",response.data.amount);
                        form.setValue("description",response.data.description);
                        form.setValue("borrowedAt",formatDateForDatetimeLocal(new Date(response.data.borrowedAt)));
                    }
                
                } catch (error) {
                    console.log(error);
                    toast.error("Server Error!")

                }
            })();
      }, [idToEdit,form]);
    
      return (
        <Modal title={from? "You Got":"You Gave"} onClose={()=>{setIdToEdit("")}}>
            <form className='flex flex-col gap-2 max-w-full w-[500px]'>
                <Input required label='Amount*' placeholder='' type='number' formHandler={form} fieldName='amount'/>
                <Input label='Description' placeholder='desc..' type='text' formHandler={form} fieldName='description'/>
                <Input required label='Date' placeholder='desc..' type="datetime-local" formHandler={form} fieldName='borrowedAt'/>
                
                <div className='h-4'/>
    
                <Button disabled={isSavingData? true:false} onClick={form.handleSubmit((data) => handleSubmit(data))}>
                    {isSavingData? "Saving Data..":"Update"}
                </Button>
            </form>
        </Modal>
      )
}
