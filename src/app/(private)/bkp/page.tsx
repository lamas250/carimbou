import Container from "@/components/container";
import RestaurantLogin from "@/components/lovable-bkp/company-view";
import MyCompaniesPage from "@/components/pages/my-companies/my-companies-page";

export default function BkpPage() {
  return (
    <Container title="BKP" description="Gerencie suas empresas">
      <RestaurantLogin />
    </Container>
  );
}
