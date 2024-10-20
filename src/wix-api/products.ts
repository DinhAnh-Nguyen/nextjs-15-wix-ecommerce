import { getWixClient } from "@/lib/wix-client.base";

type ProductsSort = "last-updated" | "price-asc" | "price-desc";

interface QueryProductsFilter {
  collectionIds?: string[] | string;
  sort?: ProductsSort;
}

export async function queryProducts({
  collectionIds,
  sort = "last-updated",
}: QueryProductsFilter) {
  const wixClient = getWixClient();

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
