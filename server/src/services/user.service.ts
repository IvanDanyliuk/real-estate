import UserDocument from "../models/user.model"
import { deleteFromCloudinary } from "./cloudinary.service";

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

export const deleteUser = async (id: string) => {
  const deletedUser = await UserDocument.findByIdAndDelete(id);
  if(deletedUser && deletedUser.profilePhoto) {
    await deleteFromCloudinary([deletedUser.profilePhoto]);
  }
  return {
    message: "User has been successfully deleted",
  };
};