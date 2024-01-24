import mongoose, { Schema } from "mongoose";
const UsersSchema = new Schema({
  autoCreatedAt: true,
  autoUpdatedAt: true,
  name: String,
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  profile: {
    type: "json",
    defaultsTo: { firstName: "", lastName: "", phone: "" }
  }
});
const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);
export default Users;
