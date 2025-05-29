import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";

interface AddYourExpenseOrSaleFormProps {
    dataForm: any;
    handleSubmit: any;
    onClose: any;
    type?: "sales" | "expense" | "moneyTaken"
}

export function AddYourExpenseOrSaleFormModal({type="expense",dataForm,handleSubmit,onClose}:AddYourExpenseOrSaleFormProps){
                const isSavingData = dataForm.watch("isSavingData");     

                return <>
                    <Modal title={type === "sales"? "Add Sale":"Add Expense"} onClose={onClose}>
                    <form className="w-[400px] max-w-full flex flex-col gap-2">
                        <Input required formHandler={dataForm} fieldName='amount' type="number" placeholder='0' label='Amount*'/>
                        <Input formHandler={dataForm} fieldName='note' type="text" placeholder='eg. something' label='Note (optional)'/>
                        <Input required formHandler={dataForm} fieldName='date' type="datetime-local"  label='Expense Date*'/>
                        
                        {
                            (type === "expense" || type === "sales") && <>
                                    <Input required formHandler={dataForm} fieldName='description' type="text" placeholder='eg. panni' label='Description*'/>
                                    
                                    {
                                        type === "sales" && <>
                                            <Input required formHandler={dataForm} fieldName='soldTo' type="text" placeholder='eg. john' label='Sold To*'/>
                                            <Input required formHandler={dataForm} fieldName='soldBy' type="text" placeholder='eg. john' label='Sold By*'/>
                                        </>
                                    }
                            </>
                        }

                        {
                            type === "moneyTaken" && <Input required formHandler={dataForm} fieldName='purpose' type="text"  label='Purpose*' placeholder="for spray"/>
                        }

                        <Select 
                            required
                            formHandler={dataForm}
                            fieldName='paymentMode'
                            label='Choose a Payment Mode*'
                            options={[
                                {
                                    label: "online",
                                    value: "online"
                                },
                                {
                                    label: "offline",
                                    value: "offline"
                                },
                            ]}
                        />
                        

                        


                        <Button 
                            onClick={dataForm.handleSubmit((data:any) => handleSubmit(data))}
                            disabled={isSavingData? true:false}
                        >
                            {isSavingData? "Saving Data..":"Add"}
                        </Button>
                    </form>
                    </Modal>
                </>
}