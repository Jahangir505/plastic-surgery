import bcrypt from "bcrypt";
import { connectToDatabase } from "libs/mongodb";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";

export default async function addUser(req, res) {
  let { email, password, role, profile } = req.body;
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");
  const session = await getServerSession(req, res, NextAuthOptions);
  try {
    if (session) {
      const newUser = {
        email: email?.toLowerCase(), // Normalize email to lowercase
        password: await bcrypt.hash(password, 10), // Hashing the password
        roles: role ?? "User",
        profile: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await usersCollection.insertOne(newUser);
      res.status(200).json({ data: result });
    } else {
      res.status(401).json({ message: "Unauthorize user" });
    }
  } catch (error) {
    console.log(`User create failed with the following error: ${error}`);
    res
      .status(500)
      .json({ error: "Error.", data: { status: "failed", error: error } });
  }

  console.log(`New user created with the following id: ${result.insertedId}`);
}
