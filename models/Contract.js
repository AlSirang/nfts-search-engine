import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  chainId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Contract ||
  mongoose.model("Contract", ContractSchema);
