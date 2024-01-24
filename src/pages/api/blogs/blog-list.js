import { connectToDatabase } from "libs/mongodb";

export default async function blogList(req, res) {
  try {
    const { db } = await connectToDatabase();
    const blogsCollection = db.collection('blogs');

    // Fetch the actual data from the collection
    const blogsData = await blogsCollection.find({ }).toArray();

    // Send only the relevant data in the response
    res.status(200).json({ data: blogsData });
  } catch (error) {
    console.error(`Blog list fetch failed with the following error: ${error}`);
    res.status(500).json({
      error: 'Error.',
      data: { status: 'failed', error: error.message || 'Internal Server Error' },
    });
  }
}
