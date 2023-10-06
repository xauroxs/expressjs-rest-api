import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
    password: { type: String, required: true, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

// User actions
export const getUsersAction = () => UserModel.find();
export const getUserByIdAction = (id: string) => UserModel.findById(id);
export const getUserByEmailAction = (email: string) =>
  UserModel.findOne({ email });
export const getUserBySessionTokenAction = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const createUserAction = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserAction = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserAction = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
