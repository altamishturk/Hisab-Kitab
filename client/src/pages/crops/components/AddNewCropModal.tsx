import React from 'react'
import { Modal } from '../../../components/Modal'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../../utils';


interface AddNewCropModalProps {
    setShowAddCropModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCrops: any;
}

export function AddNewCropModal({setShowAddCropModal,setCrops}:AddNewCropModalProps) {
  const addNewCropForm = useForm();
  const partnershipType = addNewCropForm.watch('partnershipType');


  const handleSubmit = async (data:any) => {
        try {
            
            const response = await axiosInstance.post(`/crops`,data);

            if(response?.data?.crop){
                setCrops((p:any) => {
                    if(!p){
                        return [response.data.crop]
                    }
                    return [response.data.crop,...p]
                });
            }

        } catch (error) {
            console.log(error);
        }
  }

  return (
    <Modal title='Add New Crop' onClose={()=>{setShowAddCropModal(false)}}>
        <form className='flex flex-col gap-2 max-w-full w-[500px]'>
            <input {...addNewCropForm.register('title')} className='border p-2 rounded-md' placeholder='Crop title...'/>
            <input {...addNewCropForm.register('description')} className='border p-2 rounded-md' placeholder='Crop Desc...'/>
            <input {...addNewCropForm.register('yourName')} className='border p-2 rounded-md' placeholder='Your Name...'/>
            <input {...addNewCropForm.register('cropName')} className='border p-2 rounded-md' placeholder='Crop Name...'/>
            <input {...addNewCropForm.register('startDate')} className='border p-2 rounded-md' type="datetime-local"/>
            <input {...addNewCropForm.register('endDate')} className='border p-2 rounded-md' type="datetime-local"/>
            
            <PartnershipSelector register={addNewCropForm.register} fieldName='partnershipType'/>
            
            {
                partnershipType === "partnered" && <input {...addNewCropForm.register('partnerName',{required: partnershipType === "partnered" ? 'Partner name is required' : false})} className='border p-2 rounded-md' placeholder='Partner Name...'/>
            }
            

            <button onClick={addNewCropForm.handleSubmit((data) => handleSubmit(data))} className='mt-6 bg-blue-600 text-white p-2 rounded-md'>Add New Crop</button>
        </form>
    </Modal>
  )
}



interface PartnershipSelectorProps {
  register: any;
  fieldName: string;
}


const PartnershipSelector: React.FC<PartnershipSelectorProps> = ({ register, fieldName }) => {
  return (
    <div className="">
      <h2 className="text-sm  mb-2">Are you farming solo or with a partner?</h2>
      <div className="flex gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="solo"
            {...register(fieldName,{required: true})}
          />
          <span>Solo</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="partnered"
            {...register(fieldName,{required: true})}
          />
          <span>Partnered</span>
        </label>
      </div>
    </div>
  );
};