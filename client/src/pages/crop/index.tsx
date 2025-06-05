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
                       <div className="bg-white p-6 rounded-xl mb-2">
                           <NavLink to={"/crops"}>{"<"} Back</NavLink>
                       </div>
                      {
                          cropData.partnershipType === "solo" && <>
                              <div className="bg-white p-6 rounded-xl space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-700">📌 {cropData.title}</h2>
                                    <div className="text-gray-600">
                                        <p><span className="font-medium">Crop Name:</span> {cropData.cropName}</p>
                                        <p><span className="font-medium">Description:</span> {cropData.description}</p>
                                        <p><span className="font-medium">Partners:</span> No</p>
                                        <p><span className="font-medium">Your Expense:</span> {sumByKey(cropData.yourExpenses,"amount")}</p>
                                        <p><span className="font-medium">Sales:</span> {sumByKey(cropData.sales,"amount")}</p>
                                        <p><span className="font-medium">Total Profit:</span> {sumByKey(cropData.sales,"amount")-sumByKey(cropData.yourExpenses,"amount")}</p>
                                    </div>
                              </div>

                              <div className="bg-white shadow-md rounded-xl p-4 border border-gray-100 mt-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Expense</h3>
                                    {cropData.yourExpenses.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "yourExpenses"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "yourExpenses"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("yourExpenses")}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Sales</h3>
                                    {cropData.sales.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>Sold To - {item.soldTo || 'NA'}</span>
                                            <span>Sold By - {item.soldBy || 'NA'}</span>
                                            <span>Cash Holder - {item.cashHolder || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "sales"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "sales"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("sales")}}/>
                              </div>
                          </>
                      }
                      {
                          cropData.partnershipType === "partnered" && <>
                               <div className="bg-white p-6 rounded-xl space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-700">📌 {cropData.title}</h2>
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
                                </div>


                              <div className="bg-white shadow-md rounded-xl p-4 border border-gray-100 mt-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Expense</h3>
                                    {cropData.yourExpenses.map((item: any, idx: number) => (
                                        <div key={idx} style={{borderBottom: idx === cropData.yourExpenses.length-1? "none":""}} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span >₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "yourExpenses"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "yourExpenses"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("yourExpenses")}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Partner Expense</h3>
                                    {cropData.partnerExpenses.map((item: any, idx: number) => (
                                        <div key={idx} style={{borderBottom: idx === cropData.partnerExpenses.length-1? "none":""}} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "partnerExpenses"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "partnerExpenses"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("partnerExpenses")}}/>
                                    
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Shared Expense</h3>
                                    {cropData.sharedExpenses.map((item: any, idx: number) => (
                                        <div key={idx} style={{borderBottom: idx === cropData.sharedExpenses.length-1? "none":""}} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>{item.initialPayer || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "sharedExpenses"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "sharedExpenses"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("sharedExpenses")}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Your Taken Monay</h3>
                                    {cropData.yourTakenMoney.map((item: any, idx: number) => (
                                        <div key={idx} style={{borderBottom: idx === cropData.yourTakenMoney.length-1? "none":""}} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "yourTakenMoney"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "yourTakenMoney"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("yourTakenMoney")}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Partner Taken Money</h3>
                                    {cropData.partnerTakenMoney.map((item: any, idx: number) => (
                                        <div key={idx} style={{borderBottom: idx === cropData.partnerTakenMoney.length-1? "none":""}} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "partnerTakenMoney"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "partnerTakenMoney"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{setAddItemType("partnerTakenMoney")}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Sales</h3>
                                    {cropData.sales.map((item: any, idx: number) => (
                                        <div key={idx} style={{borderBottom: idx === cropData.sales.length-1? "none":""}} className="flex flex-col border-b pb-2 gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'}</span>
                                            <span>{item.description || 'NA'}</span>
                                            <span>Sold To - {item.soldTo || 'NA'}</span>
                                            <span>Sold By - {item.soldBy || 'NA'}</span>
                                            <span>Cash Holder - {item.cashHolder || 'NA'}</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")}</span>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=> {setEditItem({itemId: item._id,itemType: "sales"})}}/>
                                                <DeleteSVG onClick={()=> {setDeleteItem({itemId: item._id,itemType: "sales"})}}/>
                                            </div>
                                        </div>
                                    ))}
                                     <AddButton label='New Entry' onClick={()=>{setAddItemType("sales")}}/>
                              </div>
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













