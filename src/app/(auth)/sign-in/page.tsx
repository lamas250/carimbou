import { Login } from "../login";

interface SignInPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const redirect = (await searchParams).redirect;

  return <Login mode="signin" redirect={redirect} />;
}
