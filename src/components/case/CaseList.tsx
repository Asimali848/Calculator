import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCaseQuery } from "@/store/services/case";

import AddCaseModal from "./AddCaseModal";
import CaseCard from "./CaseCard";
import { EmptyState } from "./EmptyState";

interface CaseListProps {
  selectedCaseId: number | null;
  onCaseSelect: (id: number) => void;
  onAddNewCase: () => void;
  onDeleteCase: (id: number) => void;
}

const CaseList = ({
  selectedCaseId,
  onCaseSelect,
  onDeleteCase,
}: CaseListProps) => {
  const token =
    localStorage.getItem("authToken") || localStorage.getItem("access") || "";
  const {
  data: cases = [],
  isLoading,
  isError,
  refetch,
} = useGetCaseQuery(token, {
  refetchOnMountOrArgChange: true,
  pollingInterval: 5000, // ← fetches data every 5 seconds
});
  const [isAddCaseModalOpen, setIsAddCaseModalOpen] = useState(false);

  const handleAddNewCaseClick = () => {
    setIsAddCaseModalOpen(true);
  };

  const handleAddCaseSubmitSuccess = () => {
    setIsAddCaseModalOpen(false);
    refetch();
  };

  if (isLoading) {
    return (
      <Card className="h-full max-h-[calc(100dvh-61px)] overflow-auto dark:bg-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">Active Cases</CardTitle>
          <Skeleton className="h-9 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="flex h-full max-h-[calc(100dvh-61px)] items-center justify-center overflow-auto dark:bg-white/10">
        <CardContent className="text-center">
          <CardTitle className="mb-2 text-xl font-bold text-destructive">
            Error loading cases
          </CardTitle>
          <p className="mb-4 text-muted-foreground">Failed to load cases</p>
          <Button onClick={refetch} variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (cases.length === 0) {
    return <EmptyState onAddNewCase={handleAddNewCaseClick} />;
  }

  return (
    <>
      <AddCaseModal
        open={isAddCaseModalOpen}
        onOpenChange={setIsAddCaseModalOpen}
        //@ts-ignore
        onSubmitSuccess={handleAddCaseSubmitSuccess}
      />

      <Card className="h-full max-h-[calc(100dvh-61px)] overflow-auto dark:bg-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">
            Active Cases ({cases.length})
          </CardTitle>
          <Button
            onClick={handleAddNewCaseClick}
            className="bg-primary text-white hover:bg-primary/80"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Case
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {cases.map((caseData: any) => (
            <CaseCard
              key={caseData.id}
              case={caseData}
              isSelected={selectedCaseId === caseData.id}
              onClick={() => onCaseSelect(caseData.id)}
              onDelete={() => onDeleteCase(caseData.id)}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default CaseList;
