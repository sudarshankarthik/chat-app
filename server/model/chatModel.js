import { Schema, model } from "mongoose";

const MessageSchema = Schema(
  {
    body: {
      type: String,
      default: "",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    sender: {
      type: "String"
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model("Message", MessageSchema);
