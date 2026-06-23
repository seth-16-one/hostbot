import Toast from "@/components/ui/Toast";
import { ToastContext, ToastType } from "@/context/ToastContext";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [visible, setVisible] = useState(false);

  const [message, setMessage] = useState("");

  const [type, setType] = useState<ToastType>("success");

  const showToast = (text: string, toastType: ToastType = "success") => {
    setMessage(text);
    setType(toastType);
    setVisible(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        visible={visible}
        message={message}
        type={type}
        onHide={() => setVisible(false)}
      />
    </ToastContext.Provider>
  );
}
