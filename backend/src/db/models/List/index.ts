import { model, Schema, Document } from 'mongoose';

export interface List {
  items: { name: string; qty: number }[];
  name: string;
  userId: string;
}

export interface ListInterface extends List, Document {}

const shoppingListSchema = new Schema(
  {
    items: {
      type: Schema.Types.Array,
      default: []
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ListInterface>('ShoppingList', shoppingListSchema);
