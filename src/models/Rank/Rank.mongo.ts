import { Schema, model, Types } from "mongoose";
import IRank from "../../types/rank";

const rankMongoModel = new Schema<IRank>({
  compatibility: { type: Number, default: null },
  jobAdvert: { type: Types.ObjectId, ref: "jobAdvert", required: true },
});

const RankModel = model("rank", rankMongoModel);

export default RankModel;
