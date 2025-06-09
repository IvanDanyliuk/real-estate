import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import { userSchema } from "../schemas/user.schema";
import { deleteUser, getUser, getUsers, updateUser } from "../services/user.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { setAuthCookies } from "../utils/cookies";


export const getUserHandler = catchErrors(async (req, res) => {
  //@ts-ignore
  const response = await getUser(req.userId);
  appAssert(response, NOT_FOUND, "User not found");
  return res.status(OK).json(response.omitPassword());
});

export const getUsersHandler = catchErrors(async (req, res) => {
  const response = await getUsers({ page: +req.params.page, itemsPerPage: +req.params.itemsPerPage })
  return res.status(OK).json(response)
});

export const updateUserHandler = catchErrors(async (req, res) => {
  const files = req.files as any[];
  const rawData = files && files.length > 0 ? {
    ...req.body,
    profilePhoto: files[0]
  } : req.body;
  const data = userSchema.parse(rawData);
  
  const { user } = await updateUser({
    _id: req.body._id,
    ...data 
  });

  return res.status(OK).json({
    payload: user,
    message: "User has been successfully updated!",
  });
});

export const deleteUserHandler = catchErrors(async (req, res) => {
  const response = await deleteUser(req.params.id);
  return res.status(OK).json(response);
});