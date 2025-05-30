import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils';
import { useForm} from 'react-hook-form';
import { NavLink, useParams } from 'react-router';
import Section from '../../components/Section';
import { AddYourExpenseOrSaleFormModal } from './components/AddYourExpenseOrSaleFormModal';
import { AddButton } from './components/AddButton';
import { sumByKey } from '../../utils/sumByKey';
import dayjs from 'dayjs';
import { PacmanLoader } from "react-spinners";



export function Crop() {
    const [cropData, setCropData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const addExpanseForm = useForm();
    const addPartnerExpanseForm = useForm();
    const addSalesForm = useForm();
    const addMoneyTakenForm = useForm();
    const addPartnerMoneyTakenForm = useForm();
    const showAddExpanse = addExpanseForm.watch("showAddExpanse");
    const showPartnerExpanse = addPartnerExpanseForm.watch("showPartnerExpanse");
    const showAddSales = addSalesForm.watch("showAddSales");
    const showMoneyTaken = addMoneyTakenForm.watch("showMoneyTaken");
    const showPartnerMoneyTaken = addPartnerMoneyTakenForm.watch("showPartnerMoneyTaken");
    const { cropId } = useParams();


    const handleAddExpenseSubmit = async (data:any) => {

        try {
            addExpanseForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/crops/your/expense/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addExpanseForm.setValue("isSavingData",false);
                addExpanseForm.setValue("showAddExpanse",false);
            }
            
        } catch (error) {
            addExpanseForm.setValue("isSavingData",false);
            console.log(error);
        }
    }

    const handleAddSalesSubmit = async (data:any) => {

        try {
            addSalesForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/crops/sale/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addSalesForm.setValue("isSavingData",false);
                addSalesForm.setValue("showAddSales",false);
            }
            
        } catch (error) {
            addSalesForm.setValue("isSavingData",false);
            console.log(error);
            
        }
    }

    const handleAddPartnerExpenseSubmit = async (data:any) => {

        try {
            addPartnerExpanseForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/crops/partner/expense/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addPartnerExpanseForm.setValue("isSavingData",false);
                addPartnerExpanseForm.setValue("showPartnerExpanse",false);
            }
            
        } catch (error) {
            addPartnerExpanseForm.setValue("isSavingData",false);
            console.log(error);
        }
    }

    const handleAddTakenMoneySubmit = async (data:any) => {

        try {
            addMoneyTakenForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/crops/your/money/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addMoneyTakenForm.setValue("isSavingData",false);
                addMoneyTakenForm.setValue("showMoneyTaken",false);
            }
            
        } catch (error) {
            addMoneyTakenForm.setValue("isSavingData",false);
            console.log(error);
        }
    }

    const handleAddPartnerTakenMoneySubmit = async (data:any) => {

        try {
            addPartnerMoneyTakenForm.setValue("isSavingData",true);
            const response = await axiosInstance.post(`/crops/partner/money/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addPartnerMoneyTakenForm.setValue("isSavingData",false);
                addPartnerMoneyTakenForm.setValue("showPartnerMoneyTaken",false);
            }
            
        } catch (error) {
            addPartnerMoneyTakenForm.setValue("isSavingData",false);
            console.log(error);
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
                  isLoading && <div className='w-full h-[90vh] flex justify-center items-center'>
                      <PacmanLoader size={50} />
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
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.description || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.paymentMode || 'NA'}</span>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{addExpanseForm.setValue("showAddExpanse",true)}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Sales</h3>
                                    {cropData.sales.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.description || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.soldBy || 'NA'}</span>
                                            <span>{item.soldTo || 'NA'}</span>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{addSalesForm.setValue("showAddSales",true)}}/>
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
                                        <p><span className="font-medium">Your Expense:</span> {sumByKey(cropData.yourExpenses,"amount")}</p>
                                        <p><span className="font-medium">Partner Expense:</span> {sumByKey(cropData.partnerExpenses,"amount")}</p>
                                        <p><span className="font-medium">Your Money Taken:</span> {sumByKey(cropData.yourTakenMoney,"amount")}</p>
                                        <p><span className="font-medium">Partner Money Taken:</span> {sumByKey(cropData.partnerTakenMoney,"amount")}</p>
                                        <p><span className="font-medium">Sales:</span> {sumByKey(cropData.sales,"amount")}</p>
                                        <p><span className="font-medium">Total Profit:</span> {sumByKey(cropData.sales,"amount")-(sumByKey(cropData.yourExpenses,"amount")+sumByKey(cropData.partnerExpenses,"amount"))}</p>
                                    </div>
                                </div>


                              <div className="bg-white shadow-md rounded-xl p-4 border border-gray-100 mt-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Expense</h3>
                                    {cropData.yourExpenses.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.description || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.paymentMode || 'NA'}</span>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{addExpanseForm.setValue("showAddExpanse",true)}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Partner Expense</h3>
                                    {cropData.partnerExpenses.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.description || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.paymentMode || 'NA'}</span>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{addPartnerExpanseForm.setValue("showPartnerExpanse",true)}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Your Taken Monay</h3>
                                    {cropData.yourTakenMoney.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.purpose || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.paymentMode || 'NA'}</span>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{addMoneyTakenForm.setValue("showMoneyTaken",true)}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Partner Taken Money</h3>
                                    {cropData.partnerTakenMoney.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.purpose || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.paymentMode || 'NA'}</span>
                                        </div>
                                    ))}
                                    <AddButton label='New Entry' onClick={()=>{addPartnerMoneyTakenForm.setValue("showPartnerMoneyTaken",true)}}/>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Sales</h3>
                                    {cropData.sales.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-wrap gap-2 mb-2">
                                            <span className='bg-gray-400 w-[30px] rounded-md text-white flex justify-center items-center'>#{idx+1}</span>
                                            <span>₹{item.amount || 'NA'},</span>
                                            <span>{dayjs(item.date).format("MMM D, YYYY h:mm A")},</span>
                                            <span>{item.description || 'NA'},</span>
                                            <span>{item.note || 'NA'},</span>
                                            <span>{item.soldBy || 'NA'}</span>
                                            <span>{item.soldTo || 'NA'}</span>
                                        </div>
                                    ))}
                                     <AddButton label='New Entry' onClick={()=>{addSalesForm.setValue("showAddSales",true)}}/>
                              </div>
                          </>
                      }
                  </>
              }

              {
                showAddExpanse && <>
                      <AddYourExpenseOrSaleFormModal 
                        handleSubmit={handleAddExpenseSubmit}  
                        dataForm={addExpanseForm}
                        onClose={()=>{addExpanseForm.setValue("showAddExpanse",false)}}
                      />
                </>
              }
              {
                showPartnerExpanse && <>
                      <AddYourExpenseOrSaleFormModal 
                        handleSubmit={handleAddPartnerExpenseSubmit}  
                        dataForm={addPartnerExpanseForm}
                        onClose={()=>{addPartnerExpanseForm.setValue("showPartnerExpanse",false)}}
                      />
                </>
              }
              {
                  showAddSales && <>
                      <AddYourExpenseOrSaleFormModal 
                        type="sales" 
                        onClose={()=>{addSalesForm.setValue("showAddSales",false)}} 
                        handleSubmit={handleAddSalesSubmit}  
                        dataForm={addExpanseForm}
                      />
                  </>
              }
              {
                  showMoneyTaken && <>
                      <AddYourExpenseOrSaleFormModal 
                        type="moneyTaken" 
                        onClose={()=>{addMoneyTakenForm.setValue("showMoneyTaken",false)}} 
                        handleSubmit={handleAddTakenMoneySubmit}  
                        dataForm={addMoneyTakenForm}
                      />
                  </>
              }
              {
                  showPartnerMoneyTaken && <>
                      <AddYourExpenseOrSaleFormModal 
                        type="moneyTaken" 
                        onClose={()=>{addPartnerMoneyTakenForm.setValue("showPartnerMoneyTaken",false)}} 
                        handleSubmit={handleAddPartnerTakenMoneySubmit}  
                        dataForm={addPartnerMoneyTakenForm}
                      />
                  </>
              }
          </div>
        </Section>
  )
}













