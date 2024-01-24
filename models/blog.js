import mongoose, { Schema } from "mongoose";
const BlogsSchema = new Schema({
  autoCreatedAt: true,
  autoUpdatedAt: true,
  title: String,
  sub_title: String,
  description: String,
  category: String,
  thumbnail: String,
  writer: String,
  
});
const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", BlogsSchema);
export default Blogs;
