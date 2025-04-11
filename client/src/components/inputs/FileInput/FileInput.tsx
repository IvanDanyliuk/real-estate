import { ChangeEvent, useRef, useState } from 'react';
import { 
  FieldError, 
  FieldErrorsImpl, 
  Merge, 
  UseFormRegister, 
  UseFormSetValue 
} from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './styles';

interface FileInputProps {
  name: string;
  multiple?: boolean;
  title?: string;
  error?: boolean;
  helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
};

export const FileInput: React.FC<FileInputProps> = ({ 
  name,
  multiple = false, 
  title = 'Upload', 
  error, 
  helperText, 
  register,
  setValue
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFilesSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(files) {
      setValue(name, files);
      const imagePreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(imagePreviews);
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    ref.current?.click();
  };

  return (
    <Box>
      <Box sx={styles.inputBtnContainer}>
        <Button
          type='button'
          onClick={handleClick}
          sx={styles.button}
        >
          {title}
        </Button>
        {previews.length > 0 && (
          <Box sx={styles.previewContainer}>
            <img 
              src={previews[previews.length - 1]} 
              alt='image' 
            />
            {previews.length > 1 && (
              <Typography>
                {`+ ${previews.length - 1} more`}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      {error && helperText && (
        <Typography>
          {helperText.toString()}
        </Typography>
      )}

      <input 
        type='file' 
        multiple={multiple} 
        {...register(name)} 
        ref={ref} 
        onChange={handleFilesSelect} 
        hidden 
      />
    </Box>
  );
};