import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";
import Image from "next/image";
import logo from "@/assets/sphere.png"
import { Button } from "./ui/button";
import Link from "next/link";


export default async function Navigation() {
  const authUser = await getAuthUser();


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left: Logo or App Name */}
        <div className="text-2xl row-auto font-bold text-blue-600 tracking-tight">
        <Image src={logo} alt="logo" width={50} height={50} />
        {/* <span className="text-xl font-bold tracking-tight">Jobs</span> */}
          <NavLink label="Jobs" href="/" />
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink label="Home" href="/" />
          <Button asChild>
          <Link href="/jobs/new">Post a Job</Link>
        </Button>

          {authUser ? (
            <>
              <NavLink label="Dashboard" href="/dashboard" />
              <form action={logout}>
                <button className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <NavLink label="Register" href="/register" />
              <NavLink label="Login" href="/login" />
            </>
          )}
          
        </div>
      </nav>
    </header>
  );
}
