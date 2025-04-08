import TermsOfUse from "@/components/landing-page/terms-and-policy/terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
};

export default function Terms() {
  return <TermsOfUse />;
}
