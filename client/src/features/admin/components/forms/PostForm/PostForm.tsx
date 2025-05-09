import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { PostDataType, postSchema } from "../validationSchemas/post.schema";
import { FileInput } from "../../../../../components/inputs/FileInput/FileInput";
import { styles } from "./styles";


interface PostInitialData extends PostDataType {
  _id?: string;
};
interface PostFormProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<any>;
  initialData: PostInitialData;
};


export const PostForm: React.FC<PostFormProps> = ({ 
  open, 
  title, 
  onClose, 
  onSubmit, 
  initialData 
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    reset,
  } = useForm<PostDataType>({
    defaultValues: initialData,
    resolver: zodResolver(postSchema)
  });

  const handleFormSubmit: SubmitHandler<PostDataType> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if(data.images) {
      for(const image of data.images) {
        formData.append('images', image);
      }
    }
    if(initialData._id) {
      formData.append('_id', initialData._id);
    }

    await onSubmit(formData);
    reset();
    onClose();
  };

  useEffect(() => {
    if(open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Box 
          component='form' 
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={styles.form}
        >
          <TextField 
            label='Title'
            fullWidth 
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title')} 
          />
          <FileInput 
            name='images'
            title='Upload images'
            register={register}
            setValue={setValue}
            multiple
            error={!!errors.images}
            helperText={errors.images?.message}
          />
          <TextField 
            label='Content'
            fullWidth 
            multiline
            rows={12}
            error={!!errors.content}
            helperText={errors.content?.message}
            {...register('content')} 
          />
          <Button 
            type='submit' 
            disabled={isSubmitting} 
            sx={styles.submitBtn}
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};