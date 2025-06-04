import React from 'react'


interface ModalProps {
    children: React.ReactElement | React.ReactElement[];
    onClose: () => void;
    title?: string;
}

export function Modal({children,onClose,title}:ModalProps) {
  return (
            <div className="fixed inset-0 z-50 bg-black/50 overflow-auto p-4">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-[450px] max-w-full bg-white border rounded-md p-6 shadow-lg">
                        <div className="flex justify-between items-center border-b mb-4 py-2">
                            <span className="text-lg font-semibold">{title}</span>
                            <svg
                            onClick={onClose}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 cursor-pointer"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
  )
}
