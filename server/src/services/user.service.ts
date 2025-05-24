import UserDocument from "../models/user.model"
import { deleteFromCloudinary, uploadToCloudinary } from "./cloudinary.service";

export type GetUsersParams = {
  page: number,
  itemsPerPage: number,
}

export const getUsers = async ({ page, itemsPerPage }: GetUsersParams) => {
  const users = await UserDocument
    .find()
    .sort({ "createdAt": -1 })
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec();

  const count = await UserDocument.countDocuments();

  return {
    users, 
    count,
  };
};

export const updateUser = async (userToUpdate: any) => {
  const existingUser = await UserDocument.findById(userToUpdate._id);
  
  const uploadedImage = userToUpdate.profilePhoto && typeof userToUpdate.profilePhoto !== 'string'   
  ? await uploadToCloudinary(userToUpdate.profilePhoto.buffer)
  : null;

  const updatedUser = await UserDocument.findByIdAndUpdate(userToUpdate._id, {
    ...userToUpdate,
    profilePhoto: uploadedImage || existingUser!.profilePhoto,
  }, { new: true });

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await UserDocument.findByIdAndDelete(id);
  if(deletedUser && deletedUser.profilePhoto) {
    await deleteFromCloudinary([deletedUser.profilePhoto]);
  }
  return {
    message: "User has been successfully deleted",
  };
};