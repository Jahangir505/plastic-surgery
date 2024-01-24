import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Management", href: "/management", icon: HomeIcon, current: true },
  { name: "User", href: "/management/user", icon: UsersIcon, current: false },
  { name: "Blog", href: "/management/blog", icon: DocumentDuplicateIcon, current: false },
  
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const route = useRouter();
  console.log(route.pathname.split("/")[2]);
  const path  = route.pathname.split("/")[2];
  const handleLogout = async () => {
    await signOut({callbackUrl: "/"});
  };
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    path === item.name.toLowerCase()
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li className="mt-auto">
          <span
           onClick={handleLogout}
            className="group cursor-pointer -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>

            Logout
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
