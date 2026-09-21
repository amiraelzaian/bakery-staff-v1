import { useState } from "react";
import {  Plus  } from "lucide-react";
import {
  useCoupons,
  useCreateCoupon,
  useUpdateCoupon,
  useDeleteCoupon,
} from "../../hooks/useCoupons";
import Pagination from "../../components/common/Pagination";
import {
  CouponFormModal,
  DeleteCouponModal,
} from "../../components/coupons/CouponModals";
import CouponsTable from "../../components/coupons/CouponsTable";

export default function Coupons() {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { type: "create" | "edit" | "delete", coupon? }
  const close = () => setModal(null);

  const { coupons, pageInfo, results, isPending, error } = useCoupons({ page });
  const create = useCreateCoupon();
  const update = useUpdateCoupon();
  const remove = useDeleteCoupon();

  const handleSubmit = (values) => {
    if (modal.type === "edit") {
      update.mutate(
        { couponId: modal.coupon._id, payload: values },
        { onSuccess: close }
      );
    } else {
      create.mutate(values, { onSuccess: close });
    }
  };

  const handleDelete = () => {
    remove.mutate(modal.coupon._id, {
      onSuccess: () => {
        close();
        // deleted the last item on this page -> go back one page
        if (coupons.length === 1 && page > 1) setPage((p) => p - 1);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Coupons</h1>
          <p className="text-sm text-muted-foreground">{results} total coupons</p>
        </div>
        <button
          onClick={() => setModal({ type: "create" })}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus size={16} />
          New coupon
        </button>
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading coupons...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load coupons.</p>
      ) : coupons.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No coupons yet. Create your first one.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto ">
            <CouponsTable
            coupons={coupons} 
            onEdit={(c) => setModal({ type: "edit", coupon: c })}
            onDelete={(c) => setModal({ type: "delete", coupon: c })}
            />
          </div>

          <Pagination pageInfo={pageInfo} onPageChange={setPage} />
        </>
      )}

      {(modal?.type === "create" || modal?.type === "edit") && (
        <CouponFormModal
          coupon={modal.coupon}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onClose={close}
        />
      )}

      {modal?.type === "delete" && (
        <DeleteCouponModal
          coupon={modal.coupon}
          isDeleting={remove.isPending}
          onConfirm={handleDelete}
          onClose={close}
        />
      )}
    </div>
  );
}