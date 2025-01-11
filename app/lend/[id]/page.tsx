import { ProductDetail, EtcProducts } from "@/src/types/lend";
import ProductDetailView from "@/src/components/product/ProductDetail";
import { ProductCard } from "@/src/components/product/ProductCard";
import styles from "@/src/styles/Product.module.css";

// 상품 상세 정보
async function getProductDetail(rentalIdx: string): Promise<ProductDetail> {
  const BASE_URL_2 = process.env.NEXT_PUBLIC_BASE_URL_2;
  const response = await fetch(
    `${BASE_URL_2}/api/noauth/getRental?rentalIdx=${rentalIdx}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`getProductDetail error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("data", data.data);
  return data.data;
}

// 판매자 다른 제품
async function getEtcProduct(
  rentalIdx: string,
  page: string = "0",
  size: string = "20"
): Promise<EtcProducts> {
  const BASE_URL_2 = process.env.NEXT_PUBLIC_BASE_URL_2;
  const queryParams = new URLSearchParams({
    rentalIdx,
    page,
    size,
  });
  const response = await fetch(
    `${BASE_URL_2}/api/noauth/getEtcRentals?${queryParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`getEtcProduct error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("etc", data.data);
  return data.data;
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const product = await getProductDetail(id);
  const etcProducts = await getEtcProduct(id);

  return (
    <>
      <ProductDetailView product={product} />
      {etcProducts.etcRentals.length > 0 && (
        <div className={styles.container}>
          {etcProducts.etcRentals.map((etcProduct) => (
            <ProductCard
              key={etcProduct.rentalSeq.toString()}
              product={etcProduct}
            />
          ))}
        </div>
      )}
    </>
  );
}
