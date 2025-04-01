import { Button } from "@/components/ui/button";
import { Edit, Pencil } from "lucide-react";

export default function CompanyEditDialog() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <Button size="sm" variant="outline">
      <Edit className="h-4 w-4" />
      {isMobile ? "Editar" : "Editar"}
    </Button>
  );
}
