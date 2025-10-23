import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const RoleSchema: Schema<IRole> = new Schema({
  name: { type: String, required: true, unique: true },
});

const Role: Model<IRole> = mongoose.model<IRole>("Role", RoleSchema);
export default Role;
