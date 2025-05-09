import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import { deleteUser, getUsers } from "../services/user.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";


export const getUserHandler = catchErrors(async (req, res) => {
  //@ts-ignore
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});

export const getUsersHandler = catchErrors(async (req, res) => {
  const response = await getUsers({ page: +req.params.page, itemsPerPage: +req.params.itemsPerPage })
  return res.status(OK).json(response)
});

export const deleteUserHandler = catchErrors(async (req, res) => {
  const response = await deleteUser(req.params.id);
  return res.status(OK).json(response);
});