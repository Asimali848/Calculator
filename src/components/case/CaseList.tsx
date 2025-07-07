import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseData } from "@/types/case";

import { CaseCard } from "./CaseCard";
import { EmptyState } from "./EmptyState";

interface CaseListProps {
  cases: CaseData[];
  selectedCaseId: string | null;
  onCaseSelect: (caseId: string) => void;
  onAddNewCase: () => void;
  onDeleteCase: (caseId: string) => void;
}

export function CaseList({
  cases,
  selectedCaseId,
  onCaseSelect,
  onAddNewCase,
}: CaseListProps) {
  if (cases.length === 0) {
    return <EmptyState onAddNewCase={onAddNewCase} />;
  }

  return (
    <Card className="h-full overflow-auto dark:bg-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Active Cases</CardTitle>
        <Button
          onClick={onAddNewCase}
          className="bg-primary text-white hover:bg-primary/80"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Case
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {cases.map((caseData) => (
          <CaseCard
            key={caseData.id}
            case={caseData}
            isSelected={selectedCaseId === caseData.id}
            onClick={() => onCaseSelect(caseData.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
