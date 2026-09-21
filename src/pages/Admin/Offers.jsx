import { useState } from "react";
import { Plus } from "lucide-react";
import {
  useOffers,
  useCreateOffer,
  useUpdateOffer,
  useDeleteOffer,
} from "../../hooks/useOffers";
import Pagination from "../../components/common/Pagination";
import OffersList from "../../components/offers/OffersList";
import { OfferFormModal, DeleteOfferModal } from "../../components/offers/OfferModals";

export default function Offers() {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { type: "create" | "edit" | "delete", offer? }
  const close = () => setModal(null);

  const { offers, pageInfo, results, isPending, error } = useOffers({ page });
  const create = useCreateOffer();
  const update = useUpdateOffer();
  const remove = useDeleteOffer();

  const handleSubmit = (values) => {
    if (modal.type === "edit") {
      update.mutate({ offerId: modal.offer._id, payload: values }, { onSuccess: close });
    } else {
      create.mutate(values, { onSuccess: close });
    }
  };

  const handleDelete = () => {
    remove.mutate(modal.offer._id, {
      onSuccess: () => {
        close();
        if (offers.length === 1 && page > 1) setPage((p) => p - 1);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Seasonal Offers</h1>
          <p className="text-sm text-muted-foreground">{results} total offers</p>
        </div>
        <button
          onClick={() => setModal({ type: "create" })}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus size={16} />
          New offer
        </button>
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading offers...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load offers.</p>
      ) : offers.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No offers yet. Create your first one.
        </p>
      ) : (
        <>
          <OffersList
            offers={offers}
            onEdit={(o) => setModal({ type: "edit", offer: o })}
            onDelete={(o) => setModal({ type: "delete", offer: o })}
          />
          <Pagination pageInfo={pageInfo} onPageChange={setPage} />
        </>
      )}

      {(modal?.type === "create" || modal?.type === "edit") && (
        <OfferFormModal
          offer={modal.offer}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onClose={close}
        />
      )}

      {modal?.type === "delete" && (
        <DeleteOfferModal
          offer={modal.offer}
          isDeleting={remove.isPending}
          onConfirm={handleDelete}
          onClose={close}
        />
      )}
    </div>
  );
}