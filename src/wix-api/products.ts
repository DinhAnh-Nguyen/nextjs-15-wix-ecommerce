import { getWixClient, WixClient } from "@/lib/wix-client.base";
import { cache } from "react";

type ProductsSort = "last-updated" | "price-asc" | "price-desc";

interface QueryProductsFilter {
  collectionIds?: string[] | string;
  sort?: ProductsSort;
}

export async function queryProducts(
  wixClient: WixClient,
  { collectionIds, sort = "last-updated" }: QueryProductsFilter,
) {
  let query = wixClient.products.queryProducts();

  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : [];

  if (collectionIdsArray.length > 0) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }

  switch (sort) {
    case "price-asc":
      query = query.ascending("price");
    case "price-desc":
      query = query.descending("price");
    case "last-updated":
      query = query.descending("lastUpdated");
      break;
  }

  return query.find();
}

export const getProductBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    console.log("getProductBySlug");

    const { items } = await wixClient.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();

    const product = items[0];

    if (!product || !product.visible) {
      return null;
    }

    return product;
  },
);
