export interface Town1 {
  sigunguName: string;
}

export interface Town2 {
  townIdx: number;
  townName: string;
}

export interface Category {
  categorySeq: number;
  categoryName: string;
  categoryOnImage: string;
  categoryOffImage: string;
}

export interface Product {
  rentalSeq: number;
  title: string;
  content: string;
  dailyRentalFee: number;
  imageUrl: string;
  towns: string[];
  regDate: number;
  likeCnt: number;
  viewCnt: number;
}

export interface ProductListFilters {
  categories?: string;
  keyword?: string;
  towns?: string | null;
}
