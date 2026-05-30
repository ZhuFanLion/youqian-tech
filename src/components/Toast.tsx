"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error";

interface ToastProps {
  type: ToastType;
  message: string;
  visible: boolean;
  onClose: () => void;
}

function Toast({ type, message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-24 right-4 z-[100] max-w-sm"
        >
          <div
            className={`flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg border ${
              type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-200"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200"
            }`}
          >
            {type === "success" ? (
              <CheckCircle size={20} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
            )}
            <p className="text-sm font-medium flex-1">{message}</p>
            <button
              onClick={onClose}
              className="shrink-0 p-0.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="关闭通知"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
    visible: boolean;
  }>({ type: "success", message: "", visible: false });

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return { toast, showToast, hideToast };
}

export default Toast;
