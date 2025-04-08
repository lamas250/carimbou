import PrivacyPolicy from "@/components/landing-page/terms-and-policy/policy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function Policy() {
  return <PrivacyPolicy />;
}
