import { Link } from "react-router";
import ProfileForm from "../../components/profile/ProfileForm";
import { StatCard } from "../../components/dashboard/DashboardBits";
import { useDeliveryStats } from "../../hooks/useDeliveryStats";


export default function Profile() {
  const { completedThisWeek, currentlyAssigned, isPending } = useDeliveryStats();

  return (
    <ProfileForm>
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-card-foreground">Your activity</h2>
          <Link to="/delivery/deliveries" className="text-sm text-primary hover:underline">
            View deliveries
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Completed this week"
            value={isPending ? "…" : completedThisWeek}
          />
          <StatCard
            label="Currently assigned"
            value={isPending ? "…" : currentlyAssigned}
          />
        </div>
      </div>
    </ProfileForm>
  );
}