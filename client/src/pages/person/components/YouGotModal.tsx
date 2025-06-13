import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { axiosInstance } from '../../../utils';
import { formatDateForDatetimeLocal } from '../../../utils/formatDateForDatetimeLocal';


interface YouGaveModalProps {
    setYouGotModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setBorrowTransacctions: React.Dispatch<React.SetStateAction<any[]|null>>;
    person: any;
}

export function YouGotModal({setBorrowTransacctions,person,setYouGotModalOpen}:YouGaveModalProps) {
      const form = useForm();
      const isSavingData = form.watch('isSavingData');
    
      const handleSubmit = async (data:any) => {
            try {
                form.setValue("isSavingData",true);
                const response = await axiosInstance.post(`/borrow-transactions`,data);
    
                // console.log(response.data);
                
                if(response?.data){
                    setBorrowTransacctions((p:any) => {
                        if(!p){
                            return [response.data]
                        }
                        return [response.data,...p]
                    });
                    form.setValue("isSavingData",false);
                    setYouGotModalOpen(false);
                }
    
            } catch (error) {
                console.log(error);
                form.setValue("isSavingData",false);
            }
      }


      useEffect(() => {
            form.setValue("from",person._id);
            form.setValue("borrowedAt",formatDateForDatetimeLocal(new Date()));
      }, [person,form]);
    
      return (
        <Modal title='You Got' onClose={()=>{setYouGotModalOpen(false)}}>
            <form className='flex flex-col gap-2 max-w-full w-[500px]'>
                <Input required label='Amount*' placeholder='' type='number' formHandler={form} fieldName='amount'/>
                <Input label='Description' placeholder='desc..' type='text' formHandler={form} fieldName='description'/>
                <Input required label='Date' placeholder='desc..' type="datetime-local" formHandler={form} fieldName='borrowedAt'/>
                
                <div className='h-4'/>
    
                <Button disabled={isSavingData? true:false} onClick={form.handleSubmit((data) => handleSubmit(data))}>
                    {isSavingData? "Saving Data..":"Add"}
                </Button>
            </form>
        </Modal>
      )
}
