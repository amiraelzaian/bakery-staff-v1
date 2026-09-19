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