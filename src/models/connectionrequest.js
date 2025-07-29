const mongoose = require("mongoose");

const connectionrequestionSchema = new mongoose.Schema(
  {
    fromUserid: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    toUserid: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} incorrect value!",
      },
    },
  },
  { timestamps: true }
);

connectionrequestionSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserid.equals(connectionRequest.toUserid)) {
    throw new Error("The person cannot send request to him/her self");
  }
  next();
});

module.exports = mongoose.model(
  "connectionrequests",
  connectionrequestionSchema
);
