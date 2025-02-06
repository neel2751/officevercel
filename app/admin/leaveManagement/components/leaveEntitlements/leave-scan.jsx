import { Button } from "@/components/ui/button";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { syncMissingLeaveTypes } from "@/server/leaveServer/leaveServer";
import { ScanSearch } from "lucide-react";

export default function LeaveScan({ item, queryKey }) {
  const { mutate: handleScan, isPending } = useSubmitMutation({
    invalidateKey: queryKey,
    mutationFn: async (data) => syncMissingLeaveTypes(data._id, data),
    onSuccessMessage: (response) => response,
    onClose: () => console.log("Scan closed"),
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => handleScan(item)}
      size="icon"
      variant="outline"
    >
      <ScanSearch />
    </Button>
  );
}
