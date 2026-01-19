import { Suspense } from "react";
import ProductsPage from "@/pages/Products";

export default function page() {
  return (
    <Suspense fallback={<div className="p-10">Loading products...</div>}>
      <ProductsPage />;
    </Suspense>
  );
}
