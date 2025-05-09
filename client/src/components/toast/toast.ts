import { toast } from "sonner";
import { styles } from './styles';

type StatusToastProps = {
  type: 'success' | 'error';
  message: string;
};

export const statusToast = ({ type, message }: StatusToastProps) => {
  return toast[type](
    message, 
    { style: type === 'success' ? styles.success : styles.error, closeButton: true },
  );
};