import { connectToDatabase } from "libs/mongodb";

export default async function userList(req, res) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Fetch the actual data from the collection

    const usersData = await usersCollection
      .find({ roles: { $ne: "Admin" } })
      .toArray();

    // Send only the relevant data in the response
    res.status(200).json({ data: usersData });
  } catch (error) {
    console.error(`User list fetch failed with the following error: ${error}`);
    res.status(500).json({
      error: "Error.",
      data: {
        status: "failed",
        error: error.message || "Internal Server Error"
      }
    });
  }
}
