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

export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUser = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUser = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
