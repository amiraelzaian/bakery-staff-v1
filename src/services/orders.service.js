import { apiClient } from "./client";




export async function markOrderAsPreparing(bakerId,orderId){
    const data=await apiClient(`/orders/${orderId}/prepare`,{
        method:"PATCH",
        body:JSON.stringify({bakerId})
    })

    return data;

}

export async function markOrderASReady(bakerId,orderId){
    const data=await apiClient(`/orders/${orderId}/ready`,{
        method:"PATCH",
        body:JSON.stringify({bakerId})
    })
    return data;
}

export async function getMyDeliveriesAsBaker(){
    const data=await apiClient(`/orders/my-baker-orders`,)
    return data
}


export async function getAllOrders({ page = 1, orderId = "", status = "" } = {}) {
  const params = new URLSearchParams({ page });
  if (orderId) params.set("orderId", orderId);
  if (status) params.set("status", status);
  return apiClient(`/orders?${params.toString()}`);
}

export async function getOrder(orderId){
    const data=await apiClient(`/orders/${orderId}`);
    return data;
}

export async function acceptOrder(orderId,bakerId){
    const data=await apiClient(`/orders/${orderId}/accept`,{
        method:"PATCH",
        body:JSON.stringify({bakerId})
    })
    return data;
}
export async function assignOrderToDelivery(orderId,deliveryId){
    const data=await apiClient(`/orders/${orderId}/assign-delivery`,{
        method:"PATCH",
        body:JSON.stringify({deliveryId})
    })
    return data;
}
export async function markOrderAsPickedUp(orderId){
    const data=await apiClient(`/orders/${orderId}/picked-up`,{
        method:"PATCH",
        
    })
    return data;
}

export async function getRefundedOrders(){
    const data=await apiClient('/orders/refunded-orders');
    return data;
}

export async function getFailedOrders(){
    const data=await apiClient('/orders/failed-orders');
    return data;
}