import express from "express";

import { getUsersAction } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsersAction();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);

    return res.sendStatus(400);
  }
};
