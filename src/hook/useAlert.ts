import { toast } from "react-toastify";

enum Type {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}

type AlertType = [
  (type: "SUCCESS" | "ERROR" | "WARNING" | "INFO", message: string) => void
];

const useAlert = (): AlertType => {
  const showAlert = (type: "SUCCESS" | "ERROR" | "WARNING" | "INFO", message: string) => {
    if (type === Type.SUCCESS) {
      toast.success(message);
    } else if (type === Type.ERROR) {
      toast.error(message);
    } else if (type === Type.WARNING) {
      toast.warning(message);
    } else if (type === Type.INFO) {
      toast.info(message);
    }
  };

  return [showAlert];
};

export default useAlert;
