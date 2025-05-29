import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";

interface AddYourExpenseOrSaleFormProps {
    addExpanseForm: any;
    handleSubmit: any;
    onClose: any;
    type?: "sales" | "expense"
}

export function AddYourExpenseOrSaleFormModal({type="expense",addExpanseForm,handleSubmit,onClose}:AddYourExpenseOrSaleFormProps){

     

    return <>
        <Modal title={type === "sales"? "Add Sale":"Add Expense"} onClose={onClose}>
          <form className="w-[500px] max-w-full flex flex-col gap-2 border rounded-md p-2 md:p-5">
              <Input required formHandler={addExpanseForm} fieldName='amount' type="number" placeholder='0' label='Amount*'/>
              <Input required formHandler={addExpanseForm} fieldName='description' type="text" placeholder='eg. panni' label='Description*'/>
              <Input formHandler={addExpanseForm} fieldName='note' type="text" placeholder='eg. something' label='Note (optional)'/>
              <Input required formHandler={addExpanseForm} fieldName='date' type="datetime-local"  label='Expense Date*'/>
              <Select 
                  required
                  formHandler={addExpanseForm}
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

              {
                  type === "sales" && <>
                      <Input required formHandler={addExpanseForm} fieldName='soldTo' type="text" placeholder='eg. john' label='Sold To*'/>
                      <Input required formHandler={addExpanseForm} fieldName='soldBy' type="text" placeholder='eg. john' label='Sold By*'/>
                  </>
              }


              <Button 
                  onClick={addExpanseForm.handleSubmit((data:any) => handleSubmit(data))}
              >
                  Add
              </Button>
          </form>
        </Modal>
    </>
}