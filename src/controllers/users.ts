import express from "express";

import { deleteUserAction, getUsersAction } from "../db/users";

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

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserAction(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);

    return res.sendStatus(400);
  }
};
