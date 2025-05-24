import React from 'react'


interface ModalProps {
    children: React.ReactElement | React.ReactElement[];
    onClose: () => void;
    title?: string;
}

export function Modal({children,onClose,title}:ModalProps) {
  return (
            <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 z-[50]'>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="border rounded-md p-2 bg-white p-8">
                        <div className="flex justify-between items-between border-b mb-4 py-2">
                            <span>{title}</span>
                            <svg onClick={onClose}   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        {children}
                    </div>
                </div> 
            </div>
  )
}
