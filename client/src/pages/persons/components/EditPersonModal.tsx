import React, { useEffect } from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../../utils';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { toast } from 'react-toastify';


interface EditPersonModalProps {
    setIdToEdit: React.Dispatch<React.SetStateAction<string>>,
    setPeople: React.Dispatch<React.SetStateAction<any[] | null>>,
    idToEdit: string;
}

export function EditPersonModal({setPeople,idToEdit,setIdToEdit}:EditPersonModalProps) {
  const form = useForm();
  const isSavingData = form.watch('isSavingData');

  const handleSubmit = async (data:any) => {
        try {
            form.setValue("isSavingData",true);
            const response = await axiosInstance.put(`/people/${idToEdit}`,data);

            console.log(response.data);
            
            if(response?.data){
                setPeople((p:any) => {
                    if(!p){
                        return [response.data.crop]
                    }
                    return p.map((person:any) => person._id === idToEdit? response.data:person)
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
            
            const response = await axiosInstance.get(`/people/${idToEdit}`);

            if(response?.data){
                form.setValue("name",response.data.name);
                form.setValue("email",response.data.email);
                form.setValue("phoneNumber",response.data.phoneNumber);
            }

        } catch (error) {
            console.log(error);
            toast.error("Server Error!");
        }
    })()
  }, [idToEdit,form]);

  return (
    <Modal title='Edit Person' onClose={()=>{setIdToEdit("")}}>
        <form className='flex flex-col gap-2 max-w-full w-[500px]'>

            <Input required label='Person Name*' placeholder='title' type='text' formHandler={form} fieldName='name'/>
            <Input label='Email' placeholder='email' type='email' formHandler={form} fieldName='email'/>
            <Input label='Phone Number' placeholder='yourName' type='text' formHandler={form} fieldName='phoneNumber'/>
      
            
            <div className='h-4'/>

            <Button disabled={isSavingData? true:false} onClick={form.handleSubmit((data) => handleSubmit(data))}>
                {isSavingData? "Saving Data..":"Save Person"}
            </Button>
        </form>
    </Modal>
  )
}


