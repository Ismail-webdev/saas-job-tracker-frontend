import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DashboardPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Total Applications</p>
        <p className="text-2xl font-bold">24</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Interviews</p>
        <p className="text-2xl font-bold">5</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Status</p>
        <Badge>Active</Badge>
      </Card>
    </div>
  );
};

export default DashboardPage;
