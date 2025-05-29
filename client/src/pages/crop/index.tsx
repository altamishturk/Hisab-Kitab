import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils';
import { useForm} from 'react-hook-form';
import { NavLink, useParams } from 'react-router';
import Section from '../../components/Section';
import { AddYourExpenseOrSaleFormModal } from './components/AddYourExpenseOrSaleFormModal';
import { AddButton } from './components/AddButton';
import { sumByKey } from '../../utils/sumByKey';



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
                  isLoading && <>
                      Loading Data..
                  </>
              }
              {
                <div className="bg-white p-6 rounded-xl mb-2">
                    <NavLink to={"/crops"}>{"<"} Back</NavLink>
                </div>
              }
              {
                  cropData && <>
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

                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-5 md:mt-10">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                      <tr>
                                          <th scope="col" className="px-6 py-3">
                                              Expenses
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                              Sales
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          new Array(Math.max(cropData.yourExpenses.length,cropData.sales.length))
                                          .fill(1).map((itme:any,idx) => {
                                              const expense = cropData.yourExpenses[idx];
                                              const sale = cropData.sales[idx];

                                              return <>
                                                  <tr key={idx} className="bg-white border-b border-gray-200">
                                                      <th className="px-6 py-4 font-normal">
                                                          {
                                                            !expense && <>NA</>
                                                          }
                                                          {
                                                            expense && <>{expense?.date} | {expense?.amount} | {expense?.description}  | {expense?.paymentMode} | {expense?.note} </>
                                                          }
                                                      </th>
                                                      <td className="px-6 py-4">
                                                          {
                                                            !sale && <>NA</> 
                                                          }
                                                          {
                                                            sale && <>{sale?.soldBy} | {sale?.soldTo} | {sale?.date} | {sale?.amount} | {sale?.description} | {sale?.paymentMode} | {sale?.note}</>
                                                          }
                                                      </td>
                                                  </tr>
                                              </>
                                          })
                                      }
                                      
                                      <tr className="bg-white border-b border-gray-200">
                                          <th className="px-6 py-4 font-normal">
                                              <AddButton label='Add New Expense' onClick={()=>{addExpanseForm.setValue("showAddExpanse",true)}}/>
                                          </th>
                                          <td className="px-6 py-4">
                                              <AddButton label='Add New Sale' onClick={()=>{addSalesForm.setValue("showAddSales",true)}}/>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
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




                               <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-5 md:mt-10">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                      <tr>
                                          <th scope="col" className="px-6 py-3">
                                              your Expenses
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                              partner Expenses
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                              your Taken Money
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                              partner Taken Money
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                              Sales
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                        {
                                            new Array(Math.max(
                                                cropData.yourExpenses.length,
                                                cropData.partnerExpenses.length,
                                                cropData.yourTakenMoney.length,
                                                cropData.partnerTakenMoney.length,
                                                cropData.sales.length,
                                            ))
                                            .fill(1).map((itme:any,idx) => {
                                                const yourExpense = cropData.yourExpenses[idx];
                                                const partnerExpense = cropData.partnerExpenses[idx];
                                                const yourTakenMoney = cropData.yourTakenMoney[idx];
                                                const partnerTakenMoney = cropData.partnerTakenMoney[idx];
                                                const sale = cropData.sales[idx];

                                                return <>
                                                    <tr key={idx} className="bg-white border-b border-gray-200">
                                                        <th className="px-6 py-4 font-normal">
                                                            {
                                                                !yourExpense && <>NA</>
                                                            }
                                                            {
                                                                yourExpense && <>{yourExpense?.date} | {yourExpense?.amount} | {yourExpense?.description}  | {yourExpense?.paymentMode} | {yourExpense?.note} </>
                                                            }
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {
                                                                !partnerExpense && <>NA</>
                                                            }
                                                            {
                                                                partnerExpense && <>{partnerExpense?.date} | {partnerExpense?.amount} | {partnerExpense?.description}  | {partnerExpense?.paymentMode} | {partnerExpense?.note} </>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                !yourTakenMoney && <>NA</>
                                                            }
                                                            {
                                                                yourTakenMoney && <>{yourTakenMoney?.amount} | {yourTakenMoney?.date} | {yourTakenMoney?.purpose}  | {yourTakenMoney?.note} | {yourTakenMoney?.paymentMode} </>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                !partnerTakenMoney && <>NA</>
                                                            }
                                                            {
                                                                partnerTakenMoney && <>{partnerTakenMoney?.amount} | {partnerTakenMoney?.date} | {partnerTakenMoney?.purpose}  | {partnerTakenMoney?.note} | {yourTakenMoney?.paymentMode}</>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                !sale && <>NA</> 
                                                            }
                                                            {
                                                                sale && <>{sale?.soldBy} | {sale?.soldTo} | {sale?.date} | {sale?.amount} | {sale?.description} | {sale?.paymentMode} | {sale?.note}</>
                                                            }
                                                        </td>
                                                    </tr>
                                                </>
                                            })
                                        }

                                        {/* action buttons  */}
                                        <tr className="bg-white border-b border-gray-200">
                                            <th className="px-6 py-4 font-normal">
                                              <AddButton label='Add Your New Expense' onClick={()=>{addExpanseForm.setValue("showAddExpanse",true)}}/>
                                            </th>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add partner Expense' onClick={()=>{addPartnerExpanseForm.setValue("showPartnerExpanse",true)}}/>
                                            </td>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add your money token' onClick={()=>{addMoneyTakenForm.setValue("showMoneyTaken",true)}}/>
                                            </td>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add partner money token' onClick={()=>{addPartnerMoneyTakenForm.setValue("showPartnerMoneyTaken",true)}}/>
                                            </td>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add New Sale' onClick={()=>{addSalesForm.setValue("showAddSales",true)}}/>
                                            </td>
                                        </tr>
                                  </tbody>
                              </table>
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













