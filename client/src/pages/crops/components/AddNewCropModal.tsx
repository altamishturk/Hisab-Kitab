import React from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../../utils';
import { Input } from '../../../components/Input';
import { InputRadio } from '../../../components/InputRadio';
import { Button } from '../../../components/Button';


interface AddNewCropModalProps {
    setShowAddCropModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCrops: any;
}

export function AddNewCropModal({setShowAddCropModal,setCrops}:AddNewCropModalProps) {
  const addNewCropForm = useForm();
  const partnershipType = addNewCropForm.watch('partnershipType');
  const isSavingData = addNewCropForm.watch('isSavingData');


  const handleSubmit = async (data:any) => {
        try {
            addNewCropForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/crops`,data);

            if(response?.data?.crop){
                setCrops((p:any) => {
                    if(!p){
                        return [response.data.crop]
                    }
                    return [response.data.crop,...p]
                });
                addNewCropForm.setValue("isSavingData",false);
                setShowAddCropModal(false);
            }

        } catch (error) {
            console.log(error);
            addNewCropForm.setValue("isSavingData",false);
        }
  }

  return (
    <Modal title='Add New Crop' onClose={()=>{setShowAddCropModal(false)}}>
        <form className='flex flex-col gap-2 max-w-full w-[500px]'>
            <Input required label='Title*' placeholder='title' type='text' formHandler={addNewCropForm} fieldName='title'/>
            <Input required label='Description*' placeholder='description' type='text' formHandler={addNewCropForm} fieldName='description'/>
            <Input required label='Your Name*' placeholder='yourName' type='text' formHandler={addNewCropForm} fieldName='yourName'/>
            <Input required label='Crop Name*' placeholder='cropName' type='text' formHandler={addNewCropForm} fieldName='cropName'/>
            <Input required label='Start Date*' placeholder='startDate' type="datetime-local" formHandler={addNewCropForm} fieldName='startDate'/>
            <Input label='End Date*' placeholder='endDate' type='datetime-local' formHandler={addNewCropForm} fieldName='endDate'/>
            
            <InputRadio 
              label={"Are you farming solo or with a partner?"} 
              formHandler={addNewCropForm} 
              fieldName='partnershipType'
              options={[
                {
                  label: "solo",
                  value: "solo",
                },
                {
                  label: "partnered",
                  value: "partnered",
                }
              ]}
            />
            
            {
                partnershipType === "partnered" && <>
                <Input required label='Partner Name*' placeholder='partnerName' type='text' formHandler={addNewCropForm} fieldName='partnerName'/>
                </>
            }
            
            <div className='h-4'/>

            <Button disabled={isSavingData? true:false} onClick={addNewCropForm.handleSubmit((data) => handleSubmit(data))}>
                {isSavingData? "Saving Data..":"Add New Crop"}
            </Button>
        </form>
    </Modal>
  )
}


