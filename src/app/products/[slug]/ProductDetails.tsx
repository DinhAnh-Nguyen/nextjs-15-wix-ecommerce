"use client";

import Badge from "@/components/ui/badge";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      {/* Product image takes 40% of the screen */}
      <div className="basis-2/5">
        <WixImage
          mediaIdentifier={product.media?.mainMedia?.image?.url}
          alt={product.media?.mainMedia?.image?.altText}
          width={1000}
          height={1000}
          className="sticky top-0"
        />
      </div>
      {/* Product details takes 60% of the screen */}
      <div className="basis 3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand}</div>
          )}
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
        </div>
        {product.description && <div dangerouslySetInnerHTML={{__html: product.description}} />}
      </div>
    </div>
  );
}
