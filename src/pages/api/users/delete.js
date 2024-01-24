import { connectToDatabase } from "libs/mongodb";

export default async function deleteUser(req, res) {
  const { id } = req.body; // Assuming the ID of the user to delete is provided in the request body
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");

  try {
    // Using deleteOne to delete the user based on their id
    const result = await usersCollection.deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ data: result });
    } else {
      res.status(404).json({
        error: "User not found.",
        data: { status: "failed", error: "User not found." }
      });
    }
  } catch (error) {
    console.error(`User deletion failed with the following error: ${error}`);
    res.status(500).json({
      error: "Error.",
      data: { status: "failed", error: error.message || "Internal Server Error" }
    });
  }
}
