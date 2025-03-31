import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import SignOut from "@/components/sign-out";
import Link from "next/link";
import LandingPage from "@/components/landing-page/page";
import Header from "@/components/header";

// export default async function Home() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h1>Not authenticated</h1>
//         <Link href="/sign-in">
//           <Button>Login</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1>Welcome {session.user.name}</h1>
//       <SignOut />
//     </div>
//   );
// }

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
