import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
export default function CompanyEditDialog() {
  return (
    <Button>
      <Pencil className="h-4 w-4" />
      Editar
    </Button>
  );
}
