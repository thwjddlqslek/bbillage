import { ProductListContainer } from "@/src/container/lend/ProductListContainer";

export default async function LendPage() {
  const BASE_URL_2 = process.env.NEXT_PUBLIC_BASE_URL_2;

  try {
    const queryParams = new URLSearchParams({
      status: "0",
      filter: "0",
      page: "0",
      size: "20",
      signIn: "0",
    });

    const productResponse = await fetch(
      `${BASE_URL_2}/api/noauth/getMainList?${queryParams}`
    );
    const products = await productResponse.json();
    console.log("products", products);

    const categoriesResponse = await fetch(`${BASE_URL_2}/api/getCategory`);
    const categories = await categoriesResponse.json();
    console.log("categories", categories);

    const towns1Response = await fetch(`${BASE_URL_2}/api/noauth/getTowns1`);
    const towns1 = await towns1Response.json();
    console.log("towns1", towns1);

    return (
      <ProductListContainer
        initialProducts={products.data?.rentals || []}
        initialCategories={categories.data?.categoryList || []}
        initialTowns1={towns1.data?.list || []}
      />
    );
  } catch (error) {
    console.error("Products error:", error);

    return <ProductListContainer initialProducts={[]} />;
  }
}
