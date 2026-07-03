import Toast from "@/components/ui/Toast";
import { ToastContext, ToastData, ToastType } from "@/context/ToastContext";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [visible, setVisible] = useState(false);

  const [toast, setToast] = useState({
    title: "",
    message: "",
    type: "success" as ToastType,
  });

  const showToast = (toastData: ToastData) => {
    setToast({
      title: toastData.title,
      message: toastData.message,
      type: toastData.type ?? "success",
    });

    setVisible(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        visible={visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setVisible(false)}
      />
    </ToastContext.Provider>
  );
}
