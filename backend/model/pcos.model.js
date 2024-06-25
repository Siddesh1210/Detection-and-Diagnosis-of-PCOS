import mongoose from "mongoose";
const pcosSchema = new mongoose.Schema(
  {
    age: {
      type: String,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    bmi: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    pulseRate: {
      type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    breathPerMinute: {
      type: String,
    },
    heartRate: {
      type: String,
    },
    missingCycle: {
      type: String,
    },
    cycleLength: {
      type: String,
    },
    marriageStatus: {
      type: String,
    },
    pregnant: {
      type: String,
    },
    noOfAborption: {
      type: String,
    },
    hip: {
      type: String,
    },
    waist: {
      type: String,
    },
    hipWaistRatio: {
      type: String,
    },
    weightGain: {
      type: String,
    },
    hairGrowth: {
      type: String,
    },
    skinDarkening: {
      type: String,
    },
    hairLoss: {
      type: String,
    },
    pimple: {
      type: String,
    },
    fastFood: {
      type: String,
    },
    regularExercise: {
      type: String,
    },
    bpSystolic: {
      type: String,
    },
    bpPrastolic: {
      type: String,
    },
    pcosResult:{
        type:String
    }
  },
  { timestamps: true }
);

const Pcos = mongoose.model("Pcos", pcosSchema);
export default Pcos;
