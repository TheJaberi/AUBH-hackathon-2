import type * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AlertCircle, CheckCircle2, X } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

interface AlertModalProps {
  message: string
  type: "success" | "error"
  onClose: () => void
  btnText?: string
  isOpen: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({ message, type, onClose, btnText = "Close", isOpen }) => {
  const { isDark } = useTheme()

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="!fixed !inset-0 !bg-black/50 !data-[state=open]:animate-overlayShow" />
        <Dialog.Content className={`!fixed left-[50%] !top-[50%] !max-h-[85vh] !w-[90vw] !max-w-[450px] !translate-x-[-50%] !translate-y-[-50%] !rounded-[6px] ${isDark ? '!bg-gray-800' : '!bg-white'} p-[25px] !shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] !focus:outline-none data-[state=open]:animate-contentShow`}>
          <Dialog.Title className={`!text-xl !font-semibold !m-2 !flex !items-center !gap-2 ${isDark ? '!text-gray-200' : '!text-gray-800'}`}>
            {type === "success" ? (
              <CheckCircle2 className="!h-6 !w-6 !text-green-500" />
            ) : (
              <AlertCircle className="!h-6 !w-6 !text-red-500" />
            )}
            {type === "success" ? "Success" : "Error"}
          </Dialog.Title>
          <Dialog.Description className={`!mx-5 ${isDark ? '!text-gray-400' : '!text-gray-500'}`}>{message}</Dialog.Description>
          <div className="!m-4 !flex !justify-end">
            <button
              onClick={onClose}
              className="!inline-flex !items-center !justify-center !rounded !px-4 !py-2 !font-medium !transition-colors !focus:outline-none !focus:ring-2 !focus:ring-offset-2 
                         !bg-blue-500 !text-white !hover:bg-blue-600 !focus:ring-blue-500"
            >
              {btnText}
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="!absolute !top-[10px] !right-[10px] !inline-flex !h-[25px] !w-[25px] !appearance-none !items-center !justify-center !rounded-full !focus:outline-none"
              aria-label="Close"
              onClick={onClose}
            >
              <X className={`${isDark ? '!text-gray-400' : '!text-gray-500'}`} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
