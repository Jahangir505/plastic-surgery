import bcrypt from "bcrypt";
import { connectToDatabase } from "libs/mongodb";
import { getServerSession } from "next-auth";

export default async function signup(req, res) {
  let { email, password, role, profile } = req.body;
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");
  try {
    
      const newUser = {
        email: email?.toLowerCase(), // Normalize email to lowercase
        password: await bcrypt.hash(password, 10), // Hashing the password
        roles: "User",
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
   
  } catch (error) {
    console.log(`User create failed with the following error: ${error}`);
    res
      .status(500)
      .json({ error: "Error.", data: { status: "failed", error: error } });
  }

  console.log(`New user created with the following id: ${result.insertedId}`);
}
