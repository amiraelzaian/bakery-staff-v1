import { useState } from "react";
import {
  useAcceptOrder,
  useAssignOrderToDelivery,
  useMarkOrderAsPickedUp,
} from "../../hooks/useOrders";
import AssignStaffModal from "./AssignStaffModal";

export default function OrderActions({ order }) {
  const [modal, setModal] = useState(null); // "baker" | "delivery" | null
  const close = () => setModal(null);

  const accept = useAcceptOrder();
  const assign = useAssignOrderToDelivery();
  const pickUp = useMarkOrderAsPickedUp();

  
  const canAccept = order.status === "pending";
  const canAssignDelivery =
    order.status === "ready" && order.deliveryMethod === "delivery";
  const canPickUp = order.status === "ready" && order.deliveryMethod === "pickup";

  if (!canAccept && !canAssignDelivery && !canPickUp) return null;

  const btn =
    "cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {canAccept && (
          <button className={btn} onClick={() => setModal("baker")}>
            Accept & assign baker
          </button>
        )}
        {canAssignDelivery && (
          <button className={btn} onClick={() => setModal("delivery")}>
            Assign delivery
          </button>
        )}
        {canPickUp && (
          <button
            className={btn}
            disabled={pickUp.isPending}
            onClick={() => pickUp.mutate(order._id)}
          >
            {pickUp.isPending ? "Saving..." : "Mark as picked up"}
          </button>
        )}
      </div>

      {modal === "baker" && (
        <AssignStaffModal
          title="Accept order & assign baker"
          role="baker"
          confirmLabel="Accept order"
          isSubmitting={accept.isPending}
          onClose={close}
          onConfirm={(bakerId) =>
            accept.mutate({ orderId: order._id, bakerId }, { onSuccess: close })
          }
        />
      )}

      {modal === "delivery" && (
        <AssignStaffModal
          title="Assign delivery"
          role="delivery"
          confirmLabel="Assign"
          isSubmitting={assign.isPending}
          onClose={close}
          onConfirm={(deliveryId) =>
            assign.mutate({ orderId: order._id, deliveryId }, { onSuccess: close })
          }
        />
      )}
    </>
  );
}