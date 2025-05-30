import React, { useEffect } from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../../utils';
import { Input } from '../../../components/Input';
import { InputRadio } from '../../../components/InputRadio';
import { Button } from '../../../components/Button';
import { formatDateForDatetimeLocal } from '../../../utils/formatDateForDatetimeLocal';


interface AddNewCropModalProps {
    setCropIdToUpdate: React.Dispatch<React.SetStateAction<string | null>>,
    setCrops: any;
    cropIdToUpdate: string ;
}

export function UpdateCropModal({cropIdToUpdate,setCropIdToUpdate,setCrops}:AddNewCropModalProps) {
  const updateCropForm = useForm();
  const partnershipType = updateCropForm.watch('partnershipType');
  const isSavingData = updateCropForm.watch('isSavingData');

  const handleSubmit = async (data:any) => {
        try {
            updateCropForm.setValue("isSavingData",true);
            const response = await axiosInstance.put(`/crops/${cropIdToUpdate}`,data);

            if(response?.data?.crop){
                setCrops((p:any) => {
                    if(!p){
                        return [response.data.crop]
                    }
                    return [response.data.crop,...p]
                });
                updateCropForm.setValue("isSavingData",false);
                setCropIdToUpdate(null);
            }

        } catch (error) {
            console.log(error);
            updateCropForm.setValue("isSavingData",false);
        }
  }

  useEffect(() => {
    (async () => {
      try {
        
        const response = await axiosInstance.get(`/crops/${cropIdToUpdate}`);

        if(response?.data){
          const crop = response.data.crop;
          updateCropForm.setValue("title",crop.title);
          updateCropForm.setValue("description",crop.description);
          updateCropForm.setValue("yourName",crop.yourName);
          updateCropForm.setValue("partnerName",crop.partnerName);
          updateCropForm.setValue("cropName",crop.cropName);
          if(crop.startDate){
            updateCropForm.setValue("startDate",formatDateForDatetimeLocal(new Date(crop.startDate)));
          }
          if(crop.endDate){
            updateCropForm.setValue("endDate",formatDateForDatetimeLocal(crop.endDate));
          }
          updateCropForm.setValue("partnershipType",crop.partnershipType);
        }

      } catch (error) {
        console.log(error);
      }
    })()
  }, [cropIdToUpdate,updateCropForm]);

  return (
    <Modal title='Update Crop' onClose={()=>{setCropIdToUpdate(null)}}>
        <form className='flex flex-col gap-2 max-w-full w-[500px]'>
            <Input required label='Title*' placeholder='title' type='text' formHandler={updateCropForm} fieldName='title'/>
            <Input required label='Description*' placeholder='description' type='text' formHandler={updateCropForm} fieldName='description'/>
            <Input required label='Your Name*' placeholder='yourName' type='text' formHandler={updateCropForm} fieldName='yourName'/>
            <Input required label='Crop Name*' placeholder='cropName' type='text' formHandler={updateCropForm} fieldName='cropName'/>
            <Input required label='Start Date*' placeholder='startDate' type="datetime-local" formHandler={updateCropForm} fieldName='startDate'/>
            <Input label='End Date*' placeholder='endDate' type='datetime-local' formHandler={updateCropForm} fieldName='endDate'/>
            
            <InputRadio 
              label={"Are you farming solo or with a partner?"} 
              formHandler={updateCropForm} 
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
                <Input required label='Partner Name*' placeholder='partnerName' type='text' formHandler={updateCropForm} fieldName='partnerName'/>
                </>
            }
            
            <div className='h-4'/>

            <Button disabled={isSavingData? true:false} onClick={updateCropForm.handleSubmit((data) => handleSubmit(data))}>
                {isSavingData? "Saving Data..":"Update"}
            </Button>
        </form>
    </Modal>
  )
}


