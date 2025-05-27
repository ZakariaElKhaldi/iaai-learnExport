"use client"

import { createContext, useContext, useState } from "react"
import { X } from "lucide-react"

type ToastProps = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
  dismissToast: () => void
  currentToast: ToastProps | null
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  dismissToast: () => {},
  currentToast: null,
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [currentToast, setCurrentToast] = useState<ToastProps | null>(null)

  const toast = (props: ToastProps) => {
    setCurrentToast(props)
    setTimeout(() => {
      setCurrentToast(null)
    }, 3000)
  }

  const dismissToast = () => setCurrentToast(null)

  return (
    <ToastContext.Provider value={{ toast, dismissToast, currentToast }}>
      {children}
      {currentToast && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <div className={`rounded-lg border p-4 shadow-md ${
            currentToast.variant === "destructive" 
              ? "bg-destructive text-destructive-foreground" 
              : "bg-background"
          }`}>
            <div className="flex justify-between">
              <h3 className="font-medium">{currentToast.title}</h3>
              <button onClick={dismissToast} className="h-4 w-4">
                <X className="h-4 w-4" />
              </button>
            </div>
            {currentToast.description && (
              <div className="mt-1 text-sm">
                {currentToast.description}
              </div>
            )}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
} 