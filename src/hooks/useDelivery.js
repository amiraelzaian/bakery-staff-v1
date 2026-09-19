
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getDeliveries, markOrderAsDelivered } from "../services/delivery.service"
import { toast } from "sonner"

export function useDelivery(deliveryId){

    const query= useQuery({
        queryKey:['deliveries'],
        queryFn:()=>getDeliveries(deliveryId),

        onErrror:()=>{
            toast.error('couldnot reload your deliveries')
        }

    })
return {
    deliveries:query.data,
    ispending:query.isPending,
    error:query.error
}

}


export function useMarkOrderAsDelivered(orderId,deliveryId){
    const queryClient=useQueryClient();
    const mutation=useMutation({
        mutationFn:()=>markOrderAsDelivered(orderId,deliveryId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['deliveries']})

        }
    })
    return {
        markOrderAsDelivered:mutation.mutate,
        isPending:mutation.isPending,
        error:mutation.error,
    }
}