import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { ItemType } from "../types";
import { axiosInstance } from "../../../utils";
import { InputRadio } from "../../../components/InputRadio";

interface AddEntryModalProps {
    onClose: any;
    addItemType: ItemType;
    cropId: string;
    setCropData: any;
}

export function AddEntryModal({setCropData,cropId,addItemType,onClose}:AddEntryModalProps){
                const addForm = useForm();   
                const isSavingData = addForm.watch("isSavingData"); 
                // const middleUrl = addForm.watch("middleUrl"); 

                const handleSubmit = async (data:any) => {
                    let url = "";
                    if(addItemType === "yourExpenses"){
                        url = "your-expense";
                    }
                    if(addItemType === "partnerExpenses"){
                        url = "partner-expense";
                    }
                    if(addItemType === "sharedExpenses"){
                        url = "shared-expense";
                    }
                    if(addItemType === "yourTakenMoney"){
                        url = "your-taken-money";
                    }
                    if(addItemType === "partnerTakenMoney"){
                        url = "partner-taken-money";
                    }
                    if(addItemType === "sales"){
                        url = "sale";
                    }


                    try {
                        
                        const response = await axiosInstance.post(`/crops/${url}/${cropId}`,data);
                        
                        if(response?.data.crop){
                            setCropData(response?.data.crop);
                            onClose();
                        }

                    } catch (error) {
                        
                    }
                    finally {
                        addForm.setValue("isSavingData",false);
                    }
                }


                return <>
                    <Modal 
                        title={"add"} 
                        onClose={onClose}
                    >
                        <form className="w-[400px] max-w-full flex flex-col gap-2">
                            <Input required formHandler={addForm} fieldName='amount' type="number" placeholder='0' label='Amount*'/>
                            <Input required formHandler={addForm} fieldName='description' type="text" placeholder='eg. panni' label='Description*'/>
                            <Input required formHandler={addForm} fieldName='date' type="datetime-local"  label='Expense Date*'/>
        
                            {
                                addItemType === "sales" && <>
                                    <Input formHandler={addForm} fieldName='soldTo' type="text" placeholder='eg. john' label='Sold To*'/>
                                    <Input formHandler={addForm} fieldName='soldBy' type="text" placeholder='eg. john' label='Sold By*'/>
                                </>
                            }

                            {
                                addItemType === "sharedExpenses" && <>
                                    <InputRadio
                                      formHandler={addForm}
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
                                addItemType === "sales" && <>
                                    <InputRadio
                                      formHandler={addForm}
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
                                onClick={addForm.handleSubmit((data:any) => handleSubmit(data))}
                                disabled={isSavingData? true:false}
                            >
                                {isSavingData? "Saving Data..":"Add"}
                            </Button>
                        </form>
                    </Modal>
                </>
}