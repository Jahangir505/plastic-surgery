import { useSession } from "next-auth/react";

const { default: AdminLayout } = require("@/HOC/admin-layouts/AdminLayout");

const Management = () => {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <h1 className="text-lg">Hi, {session?.user?.name ?? "Jhon Due"}</h1>
      <h2>Welcome to Management</h2>
    </AdminLayout>
  );
};

export default Management;
