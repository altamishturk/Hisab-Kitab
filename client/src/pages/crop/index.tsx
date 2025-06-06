import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils';
import { NavLink, useParams } from 'react-router';
import Section from '../../components/Section';
import { AddButton } from './components/AddButton';
import { sumByKey } from '../../utils/sumByKey';
import dayjs from 'dayjs';
import { EditSVG } from '../../components/SVGs/EditSVG';
import { DeleteSVG } from '../../components/SVGs/DeleteSVG';
import { EditEntryModal } from './components/EditEntryModal';
import { EditItemType, ItemType } from './types';
import { AddEntryModal } from './components/AddEntryModal';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';





export function Crop() {
    const [cropData, setCropData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { cropId } = useParams();
    const [editItem, setEditItem] = useState<EditItemType | null>(null);
    const [addItemType, setAddItemType] = useState<ItemType>(null);
    const [deleteItem, setDeleteItem] = useState<EditItemType | null>(null);
    const crop = cropData || {};
    const yourExpenses = sumByKey(crop.yourExpenses,"amount");
    const partnerExpenses = sumByKey(crop.partnerExpenses,"amount");
    const sharedExpenses = sumByKey(crop.sharedExpenses,"amount");
    const youInitiallyPaid = sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "you"),"amount");
    const partnerInitiallyPaid = sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "partner"),"amount");
    const yourTakenMoney = sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "you"),"amount")+sumByKey(crop.yourTakenMoney,"amount");
    const partnerTekenMoney = sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "partner"),"amount")+sumByKey(crop.partnerTakenMoney,"amount");
    const sales = sumByKey(crop.sales,"amount");


    const handleDelete = async () => {
        let url = "";
        if(deleteItem?.itemType === "yourExpenses"){
            url = "your-expense";
        }
        if(deleteItem?.itemType === "partnerExpenses"){
            url = "partner-expense";
        }
        if(deleteItem?.itemType === "sharedExpenses"){
            url = "shared-expense";
        }
        if(deleteItem?.itemType === "yourTakenMoney"){
            url = "your-taken-money";
        }
        if(deleteItem?.itemType === "partnerTakenMoney"){
            url = "partner-taken-money";
        }
        if(deleteItem?.itemType === "sales"){
            url = "sale";
        }

        try {
            
            const response = await axiosInstance.delete(`/crops/${cropId}/${url}/${deleteItem?.itemId}`);
            
            if(response?.data.crop){
                setCropData(response?.data.crop);
                setDeleteItem(null);
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            // addForm.setValue("isSavingData",false);
        }
    }

    useEffect(() => {
        (async () => {
            if(cropId){
              try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/crops/${cropId}`);
                // console.log(response);
                if(response.data.crop){
                  setCropData(response.data.crop);
                }
              } catch (error) {
                console.log(error);
                setCropData(null);
              }
              finally {
                setIsLoading(false);
              }
            }
        })()
    }, [cropId]);



  return (
        <Section>
          <div className='pt-5 md:pt-10'>
              {
                  isLoading && <div className='w-full flex justify-center items-center'>
                      Loading..
                  </div>
              }
              {
                  cropData && <>
                       <CardSection title=''>
                           <NavLink to={"/crops"}>{"<"} Back</NavLink>
                       </CardSection>
                       
                      {
                          cropData.partnershipType === "solo" && <>
                              <CardSection title={`📌 ${cropData.title}`}>
                                    <div className="text-gray-600">
                                        <p><span className="font-medium">Crop Name:</span> {cropData.cropName}</p>
                                        <p><span className="font-medium">Description:</span> {cropData.description}</p>
                                        <p><span className="font-medium">Partners:</span> No</p>
                                        <p><span className="font-medium">Your Expense:</span> {sumByKey(cropData.yourExpenses,"amount")}</p>
                                        <p><span className="font-medium">Sales:</span> {sumByKey(cropData.sales,"amount")}</p>
                                        <p><span className="font-medium">Total Profit:</span> {sumByKey(cropData.sales,"amount")-sumByKey(cropData.yourExpenses,"amount")}</p>
                                    </div>
                              </CardSection>
                              <CardSection title='Your Expense'>
                                    {
                                        cropData.yourExpenses.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "yourExpenses"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "yourExpenses"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("yourExpenses")}}/>
                              </CardSection>
                              <CardSection title='Sales'>
                                    {
                                        cropData.sales.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "sales"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "sales"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("sales")}}/>
                              </CardSection>
                          </>
                      }
                      {
                          cropData.partnershipType === "partnered" && <>
                                <CardSection title={`📌 ${cropData.title}`}>
                                    <div className="text-gray-600">
                                        <p><span className="font-medium">Crop Name:</span> {cropData.cropName}</p>
                                        <p><span className="font-medium">Description:</span> {cropData.description}</p>
                                        <p><span className="font-medium">Partners:</span> {cropData.yourName} & {cropData.partnerName}</p>
                                        <p><span className="font-medium">Your Expense:</span> {yourExpenses}</p>
                                        <p><span className="font-medium">Partner Expense:</span> {partnerExpenses}</p>
                                        <p><span className="font-medium">Shared Expense:</span> {sharedExpenses}</p>
                                        <p><span className="font-medium">Total Expense:</span> {yourExpenses+partnerExpenses+sharedExpenses}</p>

                                        <p><span className="font-medium">You Initially Paid:</span> {youInitiallyPaid}</p>
                                        <p><span className="font-medium">Partner Initially Paid:</span> {partnerInitiallyPaid}</p>
                                        <p><span className="font-medium">Extra Money You Paid for Expenses:</span> {youInitiallyPaid-partnerInitiallyPaid}</p>

                                        <p><span className="font-medium">Your Taken Money:</span> {yourTakenMoney-partnerTekenMoney}</p>
                                        <p><span className="font-medium">Partner Taken Money:</span> {partnerTekenMoney}</p>
                                        <p><span className="font-medium">Extra Shared Money:</span> {(yourTakenMoney-partnerTekenMoney)-partnerTekenMoney}</p>
                                        <p><span className="font-medium">Profit Share:</span> {sales/2}</p>
                                        
                                        <p><span className="font-medium">Sales:</span> {sales}</p>
                                        <p><span className="font-medium">Total Profit:</span> {sales-(yourExpenses+partnerExpenses+sharedExpenses)}</p>
                                    </div>
                                </CardSection>
                                <CardSection title='Your Expense'>
                                    {
                                        cropData.yourExpenses.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "yourExpenses"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "yourExpenses"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("yourExpenses")}}/>
                                </CardSection>
                                <CardSection title='Partner Expense'>
                                    {
                                        cropData.partnerExpenses.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "partnerExpenses"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "partnerExpenses"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("partnerExpenses")}}/>
                                </CardSection>
                                <CardSection title='Shared Expense'>
                                    {
                                        cropData.sharedExpenses.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "sharedExpenses"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "sharedExpenses"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("sharedExpenses")}}/>
                                </CardSection>
                                <CardSection title='Your Taken Monay'>
                                    {
                                        cropData.yourTakenMoney.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "yourTakenMoney"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "yourTakenMoney"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("yourTakenMoney")}}/>
                                </CardSection>
                                <CardSection title='Partner Taken Money'>
                                    {
                                        cropData.partnerTakenMoney.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "partnerTakenMoney"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "partnerTakenMoney"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("partnerTakenMoney")}}/>
                                </CardSection>
                                <CardSection title='Sales'>
                                    {
                                        cropData.sales.map((item: any, idx: number) => (
                                            <Card 
                                                serialNumber={idx+1} 
                                                date={new Date(item.date)} 
                                                description={item.description} 
                                                amount={item.amount}
                                                handleEdit={() => {setEditItem({itemId: item._id,itemType: "sales"})}}
                                                handleDelete={() => {setDeleteItem({itemId: item._id,itemType: "sales"})}}
                                            />
                                        ))
                                    }
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("sales")}}/>
                                </CardSection>
                          </>
                      }
                  </>
              }

              
              {
                editItem && <EditEntryModal setCropData={setCropData} editItem={editItem}  cropId={cropId} onClose={()=>{setEditItem(null)}}/> 
              }
              {
                cropId && addItemType && <AddEntryModal setCropData={setCropData} cropId={cropId} addItemType={addItemType} onClose={() => {setAddItemType(null)}}/>
              }

              <ConfirmDeleteModal
                isOpen={deleteItem? true:false}
                onClose={()=>{setDeleteItem(null)}}
                itemName={deleteItem?.itemType || ""}
                onConfirm={handleDelete}
              />
          </div>
        </Section>
  )
}



interface CardSectionProps {
    children: React.ReactNode,
    title: string;
}

function CardSection({children,title}: CardSectionProps){


    return <>
        <div className="bg-gray-100 p-2 md:p-6 rounded-xl mb-2">
            {
                title && <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            }
            {children}
        </div>
    </>
}


interface CardProps {
    serialNumber: number;
    date: Date;
    description: string;
    amount: number;
    handleEdit: () => void;
    handleDelete: () => void;
}

function Card({handleEdit,handleDelete,serialNumber,date,description,amount}:CardProps){


    return <>
            <div className="mb-2 flex rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
             <div className="flex justify-center items-center bg-gray-100 p-2 rounded-tl-md rounded-bl-md">
                 <span className='text-[10px]'>{serialNumber}</span>
             </div>
             <div className="flex flex-col p-2">
                 <span className='text-[10px]'>{dayjs(date).format("DD MMM YY - hh:mm a")}</span>
                 <span className='text-[12px]'>{description}</span>
             </div>
             <div className="gap-2 flex flex-1 justify-end items-center">
                 <span className='p-2'>₹ {amount}</span>
                 <span className='flex gap-2 pr-2'>
                    <EditSVG 
                        onClick={handleEdit}
                    />
                    <DeleteSVG 
                        onClick={handleDelete}
                    />
                 </span>
             </div>
           </div>
    </>
}













