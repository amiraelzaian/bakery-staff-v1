
import { apiClient } from "./client"


export async function getDeliveries(){
    const data=await apiClient('/orders/my-deliveries',{

    });
    return data
}


export async function markOrderAsDelivered(orderId,deliveryId){
    const data=await apiClient(`/orders/${orderId}/delivered`,{
        method:"PATCH",
        body:JSON.stringify({deliveryId}),
    })
    return data;
}
