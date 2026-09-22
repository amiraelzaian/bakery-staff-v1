import ProfileForm from "../../components/profile/ProfileForm";
import { StatCard } from "../../components/dashboard/DashboardBits";
import { useBakerStats } from "../../hooks/useBakerStats";
import { Link } from "react-router";

export default function Profile() {
  const { acceptedThisWeek, currentlyAssigned, isPending } = useBakerStats();

  return (
    <ProfileForm>
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-card-foreground">Your activity</h2>
          <Link to="/baker/orders" className="text-sm text-primary hover:underline">
            View orders
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Accepted this week"
            value={isPending ? "…" : acceptedThisWeek}
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