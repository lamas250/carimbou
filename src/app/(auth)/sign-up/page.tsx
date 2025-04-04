import { Login } from "../login";

interface SignUpPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const redirect = (await searchParams).redirect;

  return <Login mode="signup" redirect={redirect} />;
}
