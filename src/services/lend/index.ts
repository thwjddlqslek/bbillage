import {
  Category,
  Product,
  Town1,
  Town2,
  ProductListFilters,
} from "@/src/types/lend";

const API_ROUTES = {
  TOWNS1: "/api/noauth/getTowns1",
  TOWNS2: "/api/noauth/getTowns2",
  CATEGORIES: "/api/getCategory",
  PRODUCTS: "/api/noauth/getMainList",
} as const;

export const productService = {
  async getTowns1(): Promise<Town1[]> {
    try {
      const response = await fetch(API_ROUTES.TOWNS1);
      const result = await response.json();
      return result.data?.list || [];
    } catch (error) {
      console.error("Towns1 error:", error);
      return [];
    }
  },

  async getTowns2(area: string): Promise<Town2[]> {
    try {
      const response = await fetch(`${API_ROUTES.TOWNS2}?sigunguName=${area}`);
      const result = await response.json();
      return result.data?.list || [];
    } catch (error) {
      console.error("Towns2 error:", error);
      return [];
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(API_ROUTES.CATEGORIES);
      const result = await response.json();
      return result.data?.categoryList || [];
    } catch (error) {
      console.error("Categories error:", error);
      return [];
    }
  },

  async getProducts(params: ProductListFilters): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams({
        status: "0",
        filter: "0",
        page: "0",
        size: "20",
        signIn: "0",
        ...(params.categories && { categories: params.categories }),
        ...(params.keyword && { keyword: params.keyword }),
        ...(params.towns && { towns: params.towns }),
      });

      const response = await fetch(`${API_ROUTES.PRODUCTS}?${queryParams}`);
      const result = await response.json();
      return result.data?.rentals || [];
    } catch (error) {
      console.error("Products error:", error);
      return [];
    }
  },
};
