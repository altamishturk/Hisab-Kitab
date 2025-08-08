import { useEffect, useRef, useState } from 'react';
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
import generatePDF from 'react-to-pdf';




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
    const youInitiallyPaid = sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "you"),"amount") + sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "both"),"youPaid");
    const partnerInitiallyPaid = sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "partner"),"amount") + + sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "both"),"partnerPaid");;
    const yourTakenMoney = sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "you"),"amount")+sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "both"),"amountYouHold")+sumByKey(crop.yourTakenMoney,"amount");
    const partnerTekenMoney = sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "partner"),"amount")+sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "both"),"amountPartnerHold")+sumByKey(crop.partnerTakenMoney,"amount");
    const sales = sumByKey(crop.sales,"amount");
    const targetRef = useRef(null);


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
                       <div className="flex justify-between">
                            <NavLink  to={"/crops"}>{"<"} Back</NavLink>
                            <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})} className='text-black underline'>Download PDF</button>
                       </div>
                       <div className="mb-4"></div>
                       
                      {
                          cropData.partnershipType === "solo" && <>
                              <div className="bg-white p-6 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-gray-800 mb-4">
                                  <div className="mb-3">
                                      <p className="text-lg mb-1"><span className="font-semibold">Crop Name:</span> {cropData.cropName}</p>
                                      <p className="text-sm text-gray-600 italic">{cropData.description}</p>
                                  </div>

                                  <div className="border-t border-gray-200 pt-3 mt-3">
                                      <p className="text-lg"><span className="font-semibold">Your Total Expenses:</span> <span className="text-red-600">₹{sumByKey(cropData.yourExpenses, "amount")}</span></p>
                                      <p className="text-lg"><span className="font-semibold">Total Sales Revenue:</span> <span className="text-blue-600">₹{sumByKey(cropData.sales, "amount")}</span></p>
                                      <p className="text-xl font-bold mt-2"><span className="font-semibold">Net Profit:</span> <span className="text-green-800">₹{sumByKey(cropData.sales, "amount") - sumByKey(cropData.yourExpenses, "amount")}</span></p>
                                  </div>
                              </div>
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
                                <div className="mb-4" ref={targetRef}>
                                    {/* Project Details Card */}
                                    <div className="bg-white p-5 rounded-lg shadow mb-5">
                                            <h3 className="text-xl font-bold mb-3 text-green-600">Project Overview</h3>
                                            <p><span className="font-medium">Crop Name:</span> {cropData.cropName}</p>
                                            <p><span className="font-medium">Description:</span> {cropData.description}</p>
                                            <p><span className="font-medium">Partners:</span> {cropData.yourName} & {cropData.partnerName}</p>
                                    </div>

                                    {/* Expense Summary Card */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                            <div className="bg-white p-5 rounded-lg shadow">
                                            <h3 className="text-xl font-bold mb-3 text-red-600">Expenses</h3>
                                            <p><span className="font-medium">Your Direct Expense:</span> ₹{yourExpenses}</p>
                                            <p><span className="font-medium">Partner Direct Expense:</span> ₹{partnerExpenses}</p>
                                            <p><span className="font-medium">Shared Project Expense:</span> ₹{sharedExpenses}</p>
                                            <p className="text-lg font-bold mt-2 text-blue-700">Total Project Expense: ₹{yourExpenses + partnerExpenses + sharedExpenses}</p>
                                            </div>

                                            {/* Initial Payments Card */}
                                            <div className="bg-white p-5 rounded-lg shadow">
                                            <h3 className="text-xl font-bold mb-3 text-orange-600">Payments & Balances</h3>
                                            <p><span className="font-medium">You Got Money:</span> ₹{yourTakenMoney-sumByKey(crop.partnerTakenMoney,"amount")}</p>
                                            <p><span className="font-medium">Partner Got Money:</span> ₹{partnerTekenMoney}</p>
                                            <p><span className="font-medium">You Paid Initially:</span> ₹{youInitiallyPaid}</p>
                                            <p><span className="font-medium">Partner Paid Initially:</span> ₹{partnerInitiallyPaid}</p>
                                            {
                                                (youInitiallyPaid-partnerInitiallyPaid) > 0 && <>
                                                    <p><span className="font-medium">You will get from {crop.partnerName}:</span> ₹{(youInitiallyPaid-partnerInitiallyPaid)/2} (<small className='text-[12px]'>Extra Shared Money You have Spend</small>)</p>
                                                </>
                                            }
                                            {
                                                (youInitiallyPaid-partnerInitiallyPaid) < 0 && <>
                                                    <p><span className="font-medium">You will pay to {crop.partnerName}:</span> ₹{(partnerInitiallyPaid-youInitiallyPaid)/2} (<small className='text-[12px]'>Extra Shared Money {crop.partnerName} have Spend</small>)</p>
                                                </>
                                            }
                                            
                                            {yourTakenMoney - partnerTekenMoney !== 0 && <>
                                                {
                                                    (yourTakenMoney - partnerTekenMoney) > 0 && <>
                                                        <p className="text-red-500"><span className="font-medium">You will Give:</span> ₹{(sales / 2)-(partnerTekenMoney)}</p>
                                                    </>
                                                }
                                                {
                                                    (yourTakenMoney - partnerTekenMoney) < 0 && <>
                                                        <p className="text-green-500"><span className="font-medium">You will Get:</span> ₹{(sales / 2)-(yourTakenMoney)}</p>
                                                    </>
                                                }
                                            </>}
                                            </div>
                                    </div>

                                    {/* Profit and Sales Card */}
                                    <div className="bg-white p-5 rounded-lg shadow">
                                            <h3 className="text-xl font-bold mb-3 text-purple-600">Sales & Profit</h3>
                                            <p><span className="font-medium">Total Sales Revenue:</span> ₹{sales}</p>
                                            <p><span className="font-medium">Profit Share (Per Partner):</span> ₹{sales / 2}</p>
                                            <p className="text-xl font-bold mt-2 text-green-800">Net Project Profit: ₹{sales - (yourExpenses + partnerExpenses + sharedExpenses)}</p>
                                    </div>
                                </div>
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
                editItem && <EditEntryModal partnershipType={cropData.partnershipType} setCropData={setCropData} editItem={editItem}  cropId={cropId} onClose={()=>{setEditItem(null)}}/> 
              }
              {
                cropId && addItemType && <AddEntryModal partnershipType={cropData.partnershipType} setCropData={setCropData} cropId={cropId} addItemType={addItemType} onClose={() => {setAddItemType(null)}}/>
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
    const [showData, setShowData] = useState(false);

    return <>
        <div className="bg-gray-100 p-2 md:p-6 rounded-xl mb-2">
            {
                title && <div className={`flex justify-between items-center ${showData? "mb-2":""}`}>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    {/* {
                        !showData && <>
                            <span onClick={()=>setShowData(!showData)} title='Show Data' className='border border-gray-300 p-2 rounded-full'>
                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Arrow-Up--Streamline-Ionic-Filled" height={20} width={20} ><desc>{"\n    Arrow Up Streamline Icon: https://streamlinehq.com\n  "}</desc><path fill="#000000" fillRule="evenodd" d="M26.2176 1.3985c-1.2248 -1.2247 -3.2104 -1.2247 -4.4351 0l-18.816 18.816c-1.2247 1.2247 -1.2247 3.2104 0 4.4351 1.2247 1.2246 3.2103 1.2246 4.4351 0L20.864 11.187v33.1971c0 1.7319 1.404 3.1359 3.136 3.1359 1.732 0 3.1361 -1.404 3.1361 -3.1359V11.187l13.4624 13.4626c1.2247 1.2246 3.2104 1.2246 4.4351 0 1.2246 -1.2247 1.2246 -3.2104 0 -4.4351l-18.816 -18.816Z" clipRule="evenodd" strokeWidth={1} /></svg>
                            </span>
                        </>
                    }
                    {
                        showData && <>
                            <span onClick={()=>setShowData(!showData)} title='Hide Data' className='border border-gray-300 p-2 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Arrow-Down--Streamline-Ionic-Filled" height={20} width={20} ><desc>{"\n    Arrow Down Streamline Icon: https://streamlinehq.com\n  "}</desc><path fill="#000000" fillRule="evenodd" d="M27.1361 3.616C27.1361 1.884 25.732 0.48 24 0.48s-3.136 1.404 -3.136 3.136v33.1971L7.4016 23.3505c-1.2247 -1.2247 -3.2104 -1.2247 -4.4351 0 -1.2246 1.2248 -1.2246 3.2104 0 4.4351l18.816 18.816c1.2248 1.2246 3.2104 1.2246 4.4351 0l18.816 -18.816c1.2246 -1.2247 1.2246 -3.2103 0 -4.4351 -1.2248 -1.2247 -3.2104 -1.2247 -4.4351 0L27.1361 36.8131V3.616Z" clipRule="evenodd" strokeWidth={1} /></svg>
                            </span>
                        </>
                    } */}
                    <button
                        onClick={() => setShowData(!showData)}
                        title={showData ? 'Hide Data' : 'Show Data'}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                        aria-expanded={showData} // Accessibility: indicates if the controlled region is expanded
                        aria-controls="data-display-area" // Accessibility: links to the ID of the content being toggled
                    >
                    {showData ? (
                        // Down arrow when data is shown (to indicate collapsing)
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Arrow-Down--Streamline-Ionic-Filled" height={15} width={15} ><desc>{"\n    Arrow Down Streamline Icon: https://streamlinehq.com\n  "}</desc><path fill="#000000" fillRule="evenodd" d="M27.1361 3.616C27.1361 1.884 25.732 0.48 24 0.48s-3.136 1.404 -3.136 3.136v33.1971L7.4016 23.3505c-1.2247 -1.2247 -3.2104 -1.2247 -4.4351 0 -1.2246 1.2248 -1.2246 3.2104 0 4.4351l18.816 18.816c1.2248 1.2246 3.2104 1.2246 4.4351 0l18.816 -18.816c1.2246 -1.2247 1.2246 -3.2103 0 -4.4351 -1.2248 -1.2247 -3.2104 -1.2247 -4.4351 0L27.1361 36.8131V3.616Z" clipRule="evenodd" strokeWidth={1} /></svg>
                    ) : (
                        // Up arrow when data is hidden (to indicate expanding)
                       <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Arrow-Up--Streamline-Ionic-Filled" height={15} width={15} ><desc>{"\n    Arrow Up Streamline Icon: https://streamlinehq.com\n  "}</desc><path fill="#000000" fillRule="evenodd" d="M26.2176 1.3985c-1.2248 -1.2247 -3.2104 -1.2247 -4.4351 0l-18.816 18.816c-1.2247 1.2247 -1.2247 3.2104 0 4.4351 1.2247 1.2246 3.2103 1.2246 4.4351 0L20.864 11.187v33.1971c0 1.7319 1.404 3.1359 3.136 3.1359 1.732 0 3.1361 -1.404 3.1361 -3.1359V11.187l13.4624 13.4626c1.2247 1.2246 3.2104 1.2246 4.4351 0 1.2246 -1.2247 1.2246 -3.2104 0 -4.4351l-18.816 -18.816Z" clipRule="evenodd" strokeWidth={1} /></svg>
                    )}
                    <span className="text-gray-700 font-medium">{showData ? 'Hide Data' : 'Show Data'}</span>
                    </button>
                </div>
            }
            {showData && children}
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
    const [showCrupButtons, setShowCrupButtons] = useState(false);

    return <>
            <div className="mb-2 flex rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
             <div onClick={()=>setShowCrupButtons(p => !p)} className="cursor-pointer flex justify-center items-center bg-gray-100 p-2 rounded-tl-md rounded-bl-md">
                 <span className='text-[10px]'>{serialNumber}</span>
             </div>
             <div className="flex flex-col p-2">
                 <span className='text-[10px]'>{dayjs(date).format("DD MMM YY - hh:mm a")}</span>
                 <span className='text-[12px]'>{description}</span>
             </div>
             <div className="gap-2 flex flex-1 justify-end items-center">
                 <span className='p-2 flex gap-[2px]'><span>₹</span><span>{amount}</span></span>
                 {
                    showCrupButtons && <>
                         <span className='flex gap-2 pr-2'>
                            <EditSVG 
                                onClick={handleEdit}
                                />
                            <DeleteSVG 
                                onClick={handleDelete}
                                />
                         </span>
                    </>
                 }
             </div>
           </div>
    </>
}













