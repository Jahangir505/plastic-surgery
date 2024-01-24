async function resetPassword(username, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await client
    .db()
    .collection("users")
    .updateOne({ username }, { $set: { password: hashedPassword } });
}
