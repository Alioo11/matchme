import { Schema, model, Types } from "mongoose";
import IUser from "../../types/user";

const UserMongoModel = new Schema<IUser>({
  name: { type: String, default: null },
  linkedinProfile: { type: String, required: true, unique: true },
  company: { type: Types.ObjectId, ref: "company" },
});

const UserModel = model("user", UserMongoModel);

export default UserModel;
