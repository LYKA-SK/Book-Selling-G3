import {Schema, model, Document} from 'mongoose';

export interface IRole extends Document {
  objectId: string;
  name: string;
}

const roleSchema = new Schema<IRole>({
  objectId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export const RoleModel = model<IRole>("Role", roleSchema);

