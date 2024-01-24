import mongoose, { Schema } from "mongoose";

const LibrarySchema = new Schema(
  {
    library_title: {
      type: String,
    },
    library_video_url: {
      type: String,
    },
    thumbnail_image: {
        type: String, // You may want to store the image URL or use GridFS for storing images in MongoDB.
    },
    library_description: {
      type: String,
    },
    
   
  },
  {
    timestamps: true,
  }
);

const Library =
  mongoose.models.Library || mongoose.model("Library", LibrarySchema);

export default Library;
