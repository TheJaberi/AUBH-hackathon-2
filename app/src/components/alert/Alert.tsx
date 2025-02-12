import type React from "react"

interface AlertProps {
  message: string
  type: "success" | "error"
  onClose: () => void
  btnText?: string
}

export const Alert: React.FC<AlertProps> = ({ message, type, onClose, btnText = "Close" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="p-6 w-full max-w-md rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
        <div className="mb-4 text-lg text-gray-800 dark:text-gray-200">{message}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {btnText}
        </button>
      </div>
    </div>
  )
}

