import mongoose from "mongoose";
const pcosadvanceSchema = new mongoose.Schema(
  {
    amh: {
      type: String,
    },
    tsh: {
      type: String,
    },
    fsh_lh: {
      type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    prl: {
      type: String,
    },
    hb: {
      type: String,
    },
    rbs: {
      type: String,
    },
    pcosResult: {
      type: String,
    },
  },
  { timestamps: true }
);

const PcosAdvance = mongoose.model("PcosAdvance", pcosadvanceSchema);
export default PcosAdvance;
