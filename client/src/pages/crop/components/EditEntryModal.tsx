import { useEffect } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { axiosInstance } from "../../../utils";
import { EditItemType } from "../types";
import { useForm } from "react-hook-form";
import { formatDateForDatetimeLocal } from "../../../utils/formatDateForDatetimeLocal";
import { InputRadio } from "../../../components/InputRadio";

interface EditEntryModalProps {
    onClose: any;
    cropId: string | undefined;
    editItem: EditItemType;
    setCropData: any;
}




export function EditEntryModal({setCropData,editItem,cropId,onClose}:EditEntryModalProps){
                const editForm = useForm();   
                const isSavingData = editForm.watch("isSavingData"); 
                const middleUrl = editForm.watch("middleUrl"); 
                

                const handleSubmit = async (data:any) => {
                    try {
                        editForm.setValue("isSavingData",true);
                        const response = await axiosInstance.put(`/crops/${cropId}/${middleUrl}/${editItem.itemId}`,data);

                        setCropData(response.data.crop);
                        onClose();
                    } catch (error) {
                        
                    }
                    finally {
                        editForm.setValue("isSavingData",false);
                    }
                }

                
                useEffect(() => {
                    (async () => {
                        try {
                            const response = await axiosInstance.get(`/crops/${cropId}`);
                            const item = response.data.crop[editItem.itemType as any].find((it:any) => it._id === editItem.itemId)
                            
                            if(editItem.itemType === "yourExpenses"){
                                editForm.setValue("amount",item.amount);
                                editForm.setValue("description",item.description);
                                editForm.setValue("date",formatDateForDatetimeLocal(new Date(item.date)));
                                editForm.setValue("middleUrl","your-expense");
                            }
                            if(editItem.itemType === "partnerExpenses"){
                                editForm.setValue("amount",item.amount);
                                editForm.setValue("description",item.description);
                                editForm.setValue("date",formatDateForDatetimeLocal(new Date(item.date)));
                                editForm.setValue("middleUrl","partner-expense");
                            }
                            if(editItem.itemType === "sharedExpenses"){
                                editForm.setValue("amount",item.amount);
                                editForm.setValue("description",item.description);
                                editForm.setValue("date",formatDateForDatetimeLocal(new Date(item.date)));
                                editForm.setValue("initialPayer",item.initialPayer);
                                editForm.setValue("middleUrl","shared-expense");
                            }
                            if(editItem.itemType === "yourTakenMoney"){
                                editForm.setValue("amount",item.amount);
                                editForm.setValue("description",item.description);
                                editForm.setValue("date",formatDateForDatetimeLocal(new Date(item.date)));
                                editForm.setValue("middleUrl","your-taken-money");
                            }
                            if(editItem.itemType === "partnerTakenMoney"){
                                editForm.setValue("amount",item.amount);
                                editForm.setValue("description",item.description);
                                editForm.setValue("date",formatDateForDatetimeLocal(new Date(item.date)));
                                editForm.setValue("middleUrl","partner-taken-money");
                            }
                            if(editItem.itemType === "sales"){
                                editForm.setValue("amount",item.amount);
                                editForm.setValue("description",item.description);
                                editForm.setValue("date",formatDateForDatetimeLocal(new Date(item.date)));
                                editForm.setValue("soldBy",item.soldBy);
                                editForm.setValue("soldTo",item.soldTo);
                                editForm.setValue("cashHolder",item.cashHolder);
                                editForm.setValue("middleUrl","sale");
                            }
                            editForm.setValue("isSavingData",false);
                        } catch (error) {
                            
                            console.log(error);
                            
                        }
                    })()
                }, [cropId,editItem.itemType,editItem.itemId,editForm]);



                return <>
                    <Modal 
                        title={"Edit Item"} 
                        onClose={onClose}
                    >
                        <form className="w-[400px] max-w-full flex flex-col gap-2">
                            <Input required formHandler={editForm} fieldName='amount' type="number" placeholder='0' label='Amount*'/>
                            <Input required formHandler={editForm} fieldName='description' type="text" placeholder='eg. panni' label='Description*'/>
                            <Input required formHandler={editForm} fieldName='date' type="datetime-local"  label='Expense Date*'/>
        
                            {
                                editItem.itemType === "sales" && <>
                                    <Input formHandler={editForm} fieldName='soldTo' type="text" placeholder='eg. john' label='Sold To*'/>
                                    <Input formHandler={editForm} fieldName='soldBy' type="text" placeholder='eg. john' label='Sold By*'/>
                                </>
                            }

                            {
                                editItem.itemType === "sharedExpenses" && <>
                                    <InputRadio
                                      formHandler={editForm}
                                      fieldName="initialPayer"
                                      label="Initial Payer" 
                                      options={[
                                        {
                                            label: "You",
                                            value: "you"
                                        },
                                        {
                                            label: "Partner",
                                            value: "partner"
                                        }
                                      ]}
                                    />
                                </>
                            }
                            {
                                editItem.itemType === "sales" && <>
                                    <InputRadio
                                      formHandler={editForm}
                                      fieldName="cashHolder"
                                      label="Cash Holder" 
                                      options={[
                                        {
                                            label: "You",
                                            value: "you"
                                        },
                                        {
                                            label: "Partner",
                                            value: "partner"
                                        }
                                      ]}
                                    />
                                </>
                            }

            
                    
                            <Button 
                                onClick={editForm.handleSubmit((data:any) => handleSubmit(data))}
                                disabled={isSavingData? true:false}
                            >
                                {isSavingData? "Saving Data..":"Update"}
                            </Button>
                        </form>
                    </Modal>
                </>
}