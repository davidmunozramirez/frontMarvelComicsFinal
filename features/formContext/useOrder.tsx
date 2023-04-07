import { useContext } from "react";
import { OrderContext, OrderContextState } from "./OrderContext";

const useOrder = (): OrderContextState => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error(
            'useOrder must be used within a OrderProvider'
        );
    }
    return context;
};

export default useOrder;