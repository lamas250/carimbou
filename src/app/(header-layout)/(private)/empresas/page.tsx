import Container from "@/components/container";
import MyCompaniesPage from "@/components/pages/my-companies/my-companies-page";
import { getCompanies } from "@/features/companies/actions/get-companies";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import CreateCompanyDialog from "@/components/pages/company/create-company-dialog";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Empresas",
};

export default async function EmpresasPage() {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Error getting session", error);
      throw redirect("/sign-in");
    });

  if (!session?.user.id) {
    redirect("/sign-in");
  }

  const companies = await getCompanies(session.user.id);

  return (
    <Container
      title="Empresas"
      description="Gerencie suas empresas"
      button={<CreateCompanyDialog />}
    >
      <MyCompaniesPage companies={companies} />
    </Container>
  );
}
