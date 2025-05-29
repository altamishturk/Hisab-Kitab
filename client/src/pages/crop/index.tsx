import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils';
import { useForm} from 'react-hook-form';
import { useParams } from 'react-router';
import Section from '../../components/Section';
import { AddYourExpenseOrSaleFormModal } from './components/AddYourExpenseOrSaleFormModal';
import { AddButton } from './components/AddButton';



export function Crop() {
    const [cropData, setCropData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const addExpanseForm = useForm();
    const addSalesForm = useForm();
    const showAddExpanse = addExpanseForm.watch("showAddExpanse");
    const showAddSales = addSalesForm.watch("showAddSales");
    const { cropId } = useParams();


    const handleAddExpenseSubmit = async (data:any) => {

        try {
         
            const response = await axiosInstance.post(`/crops/your/expense/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addExpanseForm.setValue("showAddExpanse",false);
            }
            
        } catch (error) {
            
            console.log(error);
            
        }
    }

    const handleAddSalesSubmit = async (data:any) => {

        try {

            const response = await axiosInstance.post(`/crops/sale/${cropId}`,data);

            if(response?.data.crop){
                setCropData(response?.data.crop);
                addSalesForm.setValue("showAddSales",false);
            }
            
        } catch (error) {
            
            console.log(error);
            
        }
    }


    function getdata<T>(arr: T[], idx: number): any[] {
        let item = undefined;
        

        if(arr[idx]){
            item = arr[idx]
        }

        const arrSoFar = arr.filter((it,idx1) => idx1 <= idx);

        let sum = arrSoFar.reduce((sum, item:any) => {
                    const value = item?.amount;
                    return typeof value === 'number' ? sum + value : sum;
                }, 0);

        return [item,sum]
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
                  cropData && <>
                      {
                          cropData.partnershipType === "solo" && <>
                              <div className="bg-white p-6 rounded-xl space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-700">📌 {cropData.title}</h2>
                                    <div className="text-gray-600">
                                        <p><span className="font-medium">Crop Name:</span> {cropData.cropName}</p>
                                        <p><span className="font-medium">Description:</span> {cropData.description}</p>
                                        <p><span className="font-medium">Partners:</span> No</p>
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
                                          <th scope="col" className="px-6 py-3">
                                              Profit
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          new Array(Math.max(cropData.yourExpenses.length,cropData.sales.length))
                                          .fill(1).map((itme:any,idx) => {
                                              const [expense,expenseSum] = getdata(cropData.yourExpenses,idx);
                                              const [sale,saleSum] = getdata(cropData.sales,idx);

                                              return <>
                                                  <tr className="bg-white border-b border-gray-200">
                                                      <th className="px-6 py-4">
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
                                                      <td className="px-6 py-4">
                                                          ₹ {saleSum-expenseSum} 
                                                      </td>
                                                  </tr>
                                              </>
                                          })
                                      }
                                      
                                      <tr className="bg-white border-b border-gray-200">
                                          <th className="px-6 py-4">
                                              <AddButton label='Add New Expense' onClick={()=>{addExpanseForm.setValue("showAddExpanse",true)}}/>
                                          </th>
                                          <td className="px-6 py-4">
                                              <AddButton label='Add New Sale' onClick={()=>{addSalesForm.setValue("showAddSales",true)}}/>
                                          </td>
                                          <td className="px-6 py-4">
                                              
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
                                          <th scope="col" className="px-6 py-3">
                                              Profit
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                        {
                                            new Array(Math.max(cropData.yourExpenses.length,cropData.sales.length))
                                            .fill(1).map((itme:any,idx) => {
                                                const [yourExpense,yourExpenseSum] = getdata(cropData.yourExpenses,idx);
                                                const [sale,saleSum] = getdata(cropData.sales,idx);

                                                return <>
                                                    <tr className="bg-white border-b border-gray-200">
                                                        <th className="px-6 py-4">
                                                            {
                                                                !yourExpense && <>NA</>
                                                            }
                                                            {
                                                                yourExpense && <>{yourExpense?.date} | {yourExpense?.amount} | {yourExpense?.description}  | {yourExpense?.paymentMode} | {yourExpense?.note} </>
                                                            }
                                                        </th>
                                                        <td className="px-6 py-4"></td>
                                                        <td className="px-6 py-4"></td>
                                                        <td className="px-6 py-4"></td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                !sale && <>NA</> 
                                                            }
                                                            {
                                                                sale && <>{sale?.soldBy} | {sale?.soldTo} | {sale?.date} | {sale?.amount} | {sale?.description} | {sale?.paymentMode} | {sale?.note}</>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            ₹ {saleSum-yourExpenseSum} 
                                                        </td>
                                                    </tr>
                                                </>
                                            })
                                        }
                                        <tr className="bg-white border-b border-gray-200">
                                            <th className="px-6 py-4">
                                              <AddButton label='Add Your New Expense' onClick={()=>{addExpanseForm.setValue("showAddExpanse",true)}}/>
                                            </th>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add partner Expense' onClick={()=>{}}/>
                                            </td>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add your money token' onClick={()=>{}}/>
                                            </td>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add partner money token' onClick={()=>{}}/>
                                            </td>
                                            <td className="px-6 py-4">
                                              <AddButton label='Add New Sale' onClick={()=>{addSalesForm.setValue("showAddSales",true)}}/>
                                            </td>
                                            <td className="px-6 py-4"></td>
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
                        addExpanseForm={addExpanseForm}
                        onClose={()=>{addExpanseForm.setValue("showAddExpanse",false)}}
                      />
                </>
              }
              {
                  showAddSales && <>
                      <AddYourExpenseOrSaleFormModal 
                        type="sales" 
                        onClose={()=>{addSalesForm.setValue("showAddSales",false)}} 
                        handleSubmit={handleAddSalesSubmit}  
                        addExpanseForm={addExpanseForm}
                      />
                  </>
              }
          </div>
        </Section>
  )
}













