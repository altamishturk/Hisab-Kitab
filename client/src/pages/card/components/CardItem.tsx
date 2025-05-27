import { useState } from 'react'
import { calculateTotalAmount } from '../utils/calculateTotalAmount';
import { HighlightedText } from './highlightText';
import { EditSVG } from '../../../components/SVGs/EditSVG';
import { PlusSVG } from '../../../components/SVGs/PlusSVG';


interface CardItemProps {
    idx: number;
    setCardToEdit: any;
    card: any;
    searchTerm: string;
    setCardToAddMoney: any;
}

export function CardItem({idx,setCardToEdit,card,searchTerm,setCardToAddMoney}:CardItemProps) {
    const [showDetail, setShowDetail] = useState(false);
    const outstandingMoney = calculateTotalAmount(card.giftReceived)-calculateTotalAmount(card.giftsWeGave);
  
    return <div style={{backgroundColor: showDetail? "#c2c2a3":"#f5f5f0"}} key={idx} className="flex-1 min-w-[300px] relative p-2 md:p-5 rounded-md bg-white shadow-lg border-t border-t-gray-100"> 
                <div className="absolute top-0 left-0  h-[20px] rounded-md text-gray-300 pl-1 text-xs">{idx+1}</div>

                <div className="flex flex-wrap items-center gap-2 md:gap-5">
                    <p><HighlightedText text={card?.giftGiverInfo?.name} searchTerm={searchTerm}/> <span className='text-[14px] text-gray-400'>(<HighlightedText text={card?.giftGiverInfo?.village} searchTerm={searchTerm}/>)</span></p>
                    {
                        outstandingMoney < 0 && <span className='bg-green-200 p-1 px-2 text-green-700 rounded-md text-xs'>
                            You will get ₹{Math.abs(outstandingMoney)}
                        </span>
                    }
                    {
                        outstandingMoney > 0 && <span className='bg-red-300 p-1 px-2 text-red-700 rounded-md text-xs'>
                            You will pay ₹{outstandingMoney}
                        </span>
                    }
                    {
                        outstandingMoney === 0 && <span className='bg-green-200 border border-green-700 p-1 px-2 text-green-700 font-bold rounded-md text-xs'>
                            Settled Up
                        </span>
                    }

                    {/* up  */}
                    {
                      !showDetail && <>
                          <button onClick={()=>{setShowDetail(true)}} className="flex gap-1 items-center border px-1 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" id="Arrow-Up--Streamline-Lucide" height={13} width={13} ><desc>{"\n    Arrow Up Streamline Icon: https://streamlinehq.com\n  "}</desc><path d="M1.71 12.735 12 2.445l10.29 10.29" strokeWidth={2} /><path d="M12 23.025V2.445" strokeWidth={2} /></svg>
                              <span>View Details</span>
                          </button>
                      </>
                    }

                    {/* down  */}
                    {
                      showDetail && <>
                          <button onClick={()=>{setShowDetail(false)}} className="flex gap-1 items-center border px-1 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" id="Arrow-Down--Streamline-Lucide" height={13} width={13} ><desc>{"\n    Arrow Down Streamline Icon: https://streamlinehq.com\n  "}</desc><path d="M12 0.975v20.58" strokeWidth={2} /><path d="M22.29 11.265 12 21.555 1.71 11.265" strokeWidth={2} /></svg>
                              <span>Hide Details</span>
                          </button>
                      </>
                    }                      
                </div>

                {
                    showDetail && <>
                        <div className="flex flex-col items-start gap-2 pt-3 mt-3 border-t">
                            <div className="flex gap-2">
                                <button onClick={()=>{setCardToAddMoney(card)}} className='flex items-center gap-1 border p-2 rounded-md'>
                                    <span>New Transaction</span>
                                    <PlusSVG/>
                                </button>
                                <button onClick={()=>{setCardToEdit(card)}} className='flex items-center gap-1 border p-2 rounded-md'>
                                    <EditSVG/>
                                    <span>Edit</span>
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {
                                   card.giftReceived.length === 0 && card.giftsWeGave.length === 0 && <span className='text-gray-400'>No transaction history</span>
                                }
                                {
                                    card.giftReceived.map((gift:any,idx:number) => <>
                                    <div className="bg-red-100 p-2 rounded-md flex gap-2" key={idx}>
                                        <p className='text-red-600 font-bold'> {gift.amount}</p>
                                        <p className='text-red-600'> {gift.spouseName}</p>
                                        <p className='text-red-600'>{new  Date(gift.date).toLocaleDateString()}</p>
                                    </div>
                                    </>)
                                }
                                {
                                    card.giftsWeGave.map((gift:any,idx:number) => <>
                                    <div className="bg-green-100 p-2 rounded-md flex gap-2" key={idx}>
                                        <p className='text-green-600 font-bold'>{gift.amount}</p>
                                        <p className='text-green-600'>{gift.spouseName}</p>
                                        <p className='text-green-600'>{new Date(gift.date).toLocaleDateString()}</p>
                                    </div>
                                    </>)
                                }
                            </div>
                        </div>
                    </>
                }
                
        </div>
}
