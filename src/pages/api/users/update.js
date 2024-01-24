import { connectToDatabase } from "libs/mongodb";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";

export default async function updateUser(req, res) {
  const { id, email, role, profile } = req.body;
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");
  const session = await getServerSession(req, res, NextAuthOptions);
//   console.log(session);
  try {
    if (session) {
      const updatedUser = {
        email: email?.toLowerCase(), // Normalize email to lowercase
        roles: role ?? "User",
        profile: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone
        },
        updatedAt: new Date()
      };

      // Using updateOne to update the user based on their id
      const result = await usersCollection.updateOne(
        { id: id },
        { $set: updatedUser }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ data: result });
      } else {
        res.status(404).json({
          error: "User not found.",
          data: { status: "failed", error: "User not found." }
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorize user" });
    }
  } catch (error) {
    console.error(`User update failed with the following error: ${error}`);
    res.status(500).json({
      error: "Error.",
      data: {
        status: "failed",
        error: error.message || "Internal Server Error"
      }
    });
  }
}
