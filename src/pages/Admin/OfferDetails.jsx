import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useOffer, useUpdateOffer, useDeleteOffer } from "../../hooks/useOffers";
import { OfferFormModal, DeleteOfferModal } from "../../components/offers/OfferModals";

function OfferStatus({ offer }) {
  const now = new Date();
  const start = new Date(offer.startDate);
  const end = new Date(offer.endDate);

  let label = "Active";
  let cls = "bg-green-100 text-green-700";
  if (now < start) {
    label = "Upcoming";
    cls = "bg-blue-100 text-blue-700";
  } else if (now > end) {
    label = "Ended";
    cls = "bg-red-100 text-red-700";
  } else if (!offer.isActive) {
    label = "Inactive";
    cls = "bg-secondary text-secondary-foreground";
  }

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default function OfferDetails() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { offer, isPending, error } = useOffer(offerId);

  const [modal, setModal] = useState(null); // "edit" | "delete" | null
  const close = () => setModal(null);

  const update = useUpdateOffer();
  const remove = useDeleteOffer();

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading offer...</p>;
  }

  if (error || !offer) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Offer not found.</p>
        <Link to="/admin/seasonal-offers" className="mt-2 inline-block text-sm text-primary hover:underline">
          Back to offers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/seasonal-offers"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft size={14} />
        Back to offers
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">{offer.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
        </div>
        <OfferStatus offer={offer} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 text-sm">
        <h2 className="mb-3 font-semibold text-card-foreground">Details</h2>
        <div className="space-y-1 text-muted-foreground">
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="font-medium text-card-foreground">
              {offer.discountPercentage}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Starts</span>
            <span>{new Date(offer.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Ends</span>
            <span>{new Date(offer.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {offer.category ? (
        <section className="rounded-2xl border border-border bg-card p-5 text-sm">
          <h2 className="mb-3 font-semibold text-card-foreground">Applies to</h2>
          <p className="text-muted-foreground">
            All products in{" "}
            <span className="font-medium text-card-foreground">
              {offer.category.name}
            </span>
          </p>
        </section>
      ) : offer.products?.length > 0 ? (
        <section className="rounded-2xl border border-border bg-card p-5 text-sm">
          <h2 className="mb-3 font-semibold text-card-foreground">
            Applies to {offer.products.length} product
            {offer.products.length === 1 ? "" : "s"}
          </h2>
          <ul className="divide-y divide-border">
            {offer.products.map((p) => (
              <li key={p._id} className="flex items-center justify-between py-2">
                <span className="text-card-foreground">{p.name}</span>
                {p.price != null && (
                  <span className="text-muted-foreground">{p.price} EGP</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="rounded-2xl border border-border bg-card p-5 text-sm">
          <p className="text-muted-foreground">This offer has no category or products assigned.</p>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setModal("edit")}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={() => setModal("delete")}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>

      {modal === "edit" && (
        <OfferFormModal
          offer={offer}
          isSubmitting={update.isPending}
          onClose={close}
          onSubmit={(values) =>
            update.mutate({ offerId: offer._id, payload: values }, { onSuccess: close })
          }
        />
      )}

      {modal === "delete" && (
        <DeleteOfferModal
          offer={offer}
          isDeleting={remove.isPending}
          onConfirm={() =>
            remove.mutate(offer._id, {
              onSuccess: () => navigate("/admin/seasonal-offers"),
            })
          }
          onClose={close}
        />
      )}
    </div>
  );
}