import { wixBrowserClient } from "@/lib/wix-client.browser";
import { addToCart, AddToCartValues, getCart } from "@/wix-api/cart";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useToast } from "./use-toast";

// Store the query key in a var to reuse it in this file
const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  // useQuery: add data
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  // useMutation: update data
  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast({ description: "Item added to cart" });
      // You should cancel the running queries before updating the cache, otherwise it's possible that
      // a request is already in progress and then you get outdated data because of array's condition
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to add item to cart. Please try again.",
      });
    },
  });
}
