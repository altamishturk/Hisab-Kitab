import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { ItemType } from "../types";
import { axiosInstance } from "../../../utils";
import { InputRadio } from "../../../components/InputRadio";
import { useEffect } from "react";

interface AddEntryModalProps {
    onClose: any;
    addItemType: ItemType;
    cropId: string;
    setCropData: any;
    partnershipType: "solo" | "partnered";
}

export function AddEntryModal({setCropData,cropId,addItemType,onClose,partnershipType}:AddEntryModalProps){
                const addForm = useForm();   
                const isSavingData = addForm.watch("isSavingData"); 
                const cashHolder = addForm.watch("cashHolder"); 
                const initialPayer = addForm.watch("initialPayer"); 
                

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
                        addForm.setValue("isSavingData",true);
                        const response = await axiosInstance.post(`/crops/${url}/${cropId}`,data);
                        
                        if(response?.data.crop){
                            setCropData(response?.data.crop);
                            onClose();
                        }
                        addForm.setValue("isSavingData",false);

                    } catch (error) {
                        
                    }
                    finally {
                        addForm.setValue("isSavingData",false);
                    }
                }

                useEffect(() => {
                    if(initialPayer !== "both"){
                        addForm.setValue("youPaid",0);
                        addForm.setValue("partnerPaid",0);
                    }
                    if(cashHolder !== "both"){
                        addForm.setValue("amountYouHold",0);
                        addForm.setValue("amountPartnerHold",0);
                    }
                }, [cashHolder,initialPayer,addForm]);

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
                                (addItemType === "sharedExpenses" && partnershipType !== "solo") && <>
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
                                        },
                                        {
                                            label: "Both",
                                            value: "both"
                                        }
                                      ]}
                                    />

                                    {
                                        initialPayer === "both" && <>
                                            <Input required formHandler={addForm} fieldName='youPaid' type="number" placeholder='0' label='You Paid*'/>
                                            <Input required formHandler={addForm} fieldName='partnerPaid' type="number" placeholder='0' label='Partner Paid*'/>
                                        </>
                                    }
                                </>
                            }
                            {
                                (addItemType === "sales" && partnershipType !== "solo") && <>
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
                                        },
                                        {
                                            label: "Both",
                                            value: "both"
                                        }
                                      ]}
                                    />

                                    {
                                        cashHolder === "both" && <>
                                            <Input required formHandler={addForm} fieldName='amountYouHold' type="number" placeholder='0' label='Amount You Hold*'/>
                                            <Input required formHandler={addForm} fieldName='amountPartnerHold' type="number" placeholder='0' label='Amount Partner Hold*'/>
                                        </>
                                    }
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