import type React from "react"

interface CardProps {
    title?: string
    content: string
    imageUrl?: string
}

const Card: React.FC<CardProps> = ({ title, content, imageUrl }) => {
    return (
        <div className="!bg-white !dark:bg-gray-800 !rounded-xl !overflow-hidden !shadow-lg !transition-all !duration-300 hover:!shadow-xl hover:!-translate-y-1 !m-4">
            {imageUrl && (
                <div className="!h-48 !w-full !overflow-hidden">
                    <img src={imageUrl || "/placeholder.svg"} alt={title} className="!w-full !h-full !object-cover" />
                </div>
            )}
            <div className="!p-6">
                {title && <h2 className="!text-2xl !font-bold !mb-2 !text-gray-800 !dark:text-white">{title}</h2>}
                <p className="!text-gray-600 !dark:text-gray-300">{content}</p>
            </div>
        </div>
    )
}

export default Card

