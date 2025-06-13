import React from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../../utils';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';


interface AddNewCropModalProps {
    setShowAddPersonModal: React.Dispatch<React.SetStateAction<boolean>>,
    setPeople: React.Dispatch<React.SetStateAction<any[] | null>>,
}

export function AddPersonModal({setPeople,setShowAddPersonModal}:AddNewCropModalProps) {
  const addNewForm = useForm();
  const isSavingData = addNewForm.watch('isSavingData');

  const handleSubmit = async (data:any) => {
        try {
            addNewForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/people`,data);

            if(response?.data?.person){
                setPeople((p:any) => {
                    if(!p){
                        return [response.data.person]
                    }
                    return [response.data.person,...p]
                });
                addNewForm.setValue("isSavingData",false);
                setShowAddPersonModal(false);
            }

        } catch (error) {
            console.log(error);
            addNewForm.setValue("isSavingData",false);
        }
  }

  return (
    <Modal title='New Person' onClose={()=>{setShowAddPersonModal(false)}}>
        <form className='flex flex-col gap-2 max-w-full w-[500px]'>

            <Input required label='Person Name*' placeholder='title' type='text' formHandler={addNewForm} fieldName='name'/>
            <Input label='Email' placeholder='email' type='email' formHandler={addNewForm} fieldName='email'/>
            <Input label='Phone Number' placeholder='yourName' type='text' formHandler={addNewForm} fieldName='phoneNumber'/>
      
            
            <div className='h-4'/>

            <Button disabled={isSavingData? true:false} onClick={addNewForm.handleSubmit((data) => handleSubmit(data))}>
                {isSavingData? "Saving Data..":"Add New Person"}
            </Button>
        </form>
    </Modal>
  )
}


