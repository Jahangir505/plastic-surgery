import { connectToDatabase } from "libs/mongodb";

export default async function deleteBlog(req, res) {
  const { id } = req.body; // Assuming the ID of the blog to delete is provided in the request body
  const { db } = await connectToDatabase();
  const blogsCollection = db.collection("blogs");

  try {
    // Using deleteOne to delete the blog based on their id
    const result = await blogsCollection.deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ data: result });
    } else {
      res.status(404).json({
        error: "blog not found.",
        data: { status: "failed", error: "blog not found." }
      });
    }
  } catch (error) {
    console.error(`Blog deletion failed with the following error: ${error}`);
    res.status(500).json({
      error: "Error.",
      data: { status: "failed", error: error.message || "Internal Server Error" }
    });
  }
}
