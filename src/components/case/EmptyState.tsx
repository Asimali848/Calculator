import { FileText, Plus, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  onAddNewCase: () => void;
}

export function EmptyState({ onAddNewCase }: EmptyStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <Card className="mx-auto w-full max-w-md border-2 border-dashed border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Scale className="h-10 w-10 text-primary/80" />
            </div>
            <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              No Cases Yet
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Start managing your legal cases by creating your first case. Track
              payments, calculate interest, and manage all case details in one
              place.
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button
              onClick={onAddNewCase}
              className="w-full bg-primary text-white hover:bg-primary/80"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Case
            </Button>

            <div className="text-xs text-muted-foreground">
              Get started with case management
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-4 border-t border-border pt-4">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xs text-muted-foreground">Track Cases</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-xs text-muted-foreground">Add Payments</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Scale className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-xs text-muted-foreground">
                Calculate Interest
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
