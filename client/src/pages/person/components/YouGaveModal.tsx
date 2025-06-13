import React, { useEffect } from 'react'
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { useForm } from 'react-hook-form';
import { formatDateForDatetimeLocal } from '../../../utils/formatDateForDatetimeLocal';
import { axiosInstance } from '../../../utils';


interface YouGaveModalProps {
    setYouGaveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setBorrowTransacctions: React.Dispatch<React.SetStateAction<any[]|null>>;
    person: any;
}

export function YouGaveModal({setBorrowTransacctions,person,setYouGaveModalOpen}:YouGaveModalProps) {
       const form = useForm();
       const isSavingData = form.watch('isSavingData');
     
       const handleSubmit = async (data:any) => {
             try {
                 form.setValue("isSavingData",true);
                 const response = await axiosInstance.post(`/borrow-transactions`,data);
                 
        
                 if(response?.data){
                     setBorrowTransacctions((p:any) => {
                         if(!p){
                             return [response.data]
                         }
                         return [response.data,...p]
                     });
                     form.setValue("isSavingData",false);
                     setYouGaveModalOpen(false);
                 }
                 
             } catch (error) {
                 console.log(error);
                 form.setValue("isSavingData",false);
             }
       }


       useEffect(() => {
            form.setValue("to",person._id);
            form.setValue("borrowedAt",formatDateForDatetimeLocal(new Date()));
       }, [person,form]);
     
       return (
         <Modal title='You Gave' onClose={()=>{setYouGaveModalOpen(false)}}>
             <form className='flex flex-col gap-2 max-w-full w-[500px]'>
     
                 <Input required label='Amount*' placeholder='' type='number' formHandler={form} fieldName='amount'/>
                 <Input label='Description' placeholder='desc..' type='text' formHandler={form} fieldName='description'/>
                 <Input required label='Date*' placeholder='desc..' type="datetime-local" formHandler={form} fieldName='borrowedAt'/>
       
                 
                 <div className='h-4'/>
     
                 <Button disabled={isSavingData? true:false} onClick={form.handleSubmit((data) => handleSubmit(data))}>
                     {isSavingData? "Saving Data..":"Add"}
                 </Button>
             </form>
         </Modal>
       )
}
