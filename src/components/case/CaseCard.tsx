import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/calculations";
import { cn } from "@/lib/utils";
import { CaseData } from "@/types/case";

interface CaseCardProps {
  case: CaseData;
  isSelected: boolean;
  onClick: () => void;
}

export function CaseCard({
  case: caseData,
  isSelected,
  onClick,
}: CaseCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer border-2 transition-all duration-200 hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold text-primary">
          {caseData.caseName}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Payoff Amount</span>
          <span className="text-sm font-bold text-foreground">
            {formatCurrency(caseData.payoffAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
