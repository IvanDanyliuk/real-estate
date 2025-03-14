import { z as zod } from "zod";
import SessionModel from "../models/session.model";
import catchErrors from "../utils/catchErrors";
import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";

export const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      //@ts-ignore
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      //@ts-ignore
      ...(session.id === req.sessionId && {
        isCurrent: true,
      })
    }))
  )
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = zod.string().parse(req.params.id);
  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    //@ts-ignore
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Session not found");
  return res.status(OK).json({
    message: "Session removed",
  });
});