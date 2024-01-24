import { connectToDatabase } from "libs/mongodb";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";

export default async function addUpdateBlog(req, res) {
    console.log(req.body);
  let { title, id,description, sub_title, category, thumbnail } = req.body;
  const { db } = await connectToDatabase();
  const blogsCollection = db.collection("blogs");
  const session = await getServerSession(req, res, NextAuthOptions);
    console.log({title, id,description, sub_title, category, thumbnail});
  try {
    
      // Check if the blog with the given id already exists
      const existingBlog = await blogsCollection.findOne({ id: id });
    //   console.log("Existing", existingBlog);
    if (id && id.trim() !== "") {
        // If the blog exists, update it
        const updatedBlog = {
          title: title,
          sub_title: sub_title,
          description: description,
          category: category,
          writer: null,
          thumbnail: thumbnail,
          updatedAt: new Date(),
        };

        console.log("Update Blog", updatedBlog);
      
        const updateResult = await blogsCollection.updateOne({ id: id }, { $set: updatedBlog });
        res.status(200).json({ data: updateResult, message: "Blog Update Successfully!" });
      } else {
        // If the blog doesn't exist or id is falsy or an empty string, create a new one
        const newBlog = {
          id: id, // Assuming id is a unique identifier for your blog
          title: title,
          sub_title: sub_title,
          description: description,
          category: category,
          writer: null,
          thumbnail: thumbnail,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        // console.log("New Blog", newBlog);
        const createResult = await blogsCollection.insertOne(newBlog);
        res.status(200).json({ data: createResult, message: "Blog Create Successfully!" });
      }
   
  } catch (error) {
    console.log(`Blog create/update failed with the following error: ${error}`);
    res.status(500).json({
      error: "Error.",
      data: { status: "failed", error: error.message || "Internal Server Error" }
    });
  }
}
