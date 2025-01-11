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
  page?: string;
  size?: string;
  initialProducts?: Product[];
  initialCategories?: Category[];
  initialTowns1?: Town1[];
}

export interface ProductDetail {
  activityScore: number;
  bellButton: boolean;
  categoryInfo: {
    categoryIdx: number;
    categoryName: string;
  }[];
  content: string;
  createAt: number;
  dailyFee: number;
  grade: string;
  images: [];
  isMine: boolean;
  likeCount: number;
  likeFlag: boolean;
  maxScore: number;
  rentalSeq: number;
  rentalStatus: number;
  reviewCount: number;
  title: string;
  towns: {
    townSeq: number;
    townName: string;
  }[];
  userIdx: number;
  userNickName: string;
  userProfileImage: string;
  userStarPoint: number;
  viewCount: number;
}

export interface EtcProducts {
  etcRentalTotalCount: number;
  etcRentals: {
    dailyRentalFee: number;
    imageUrl: string;
    likeCnt: number;
    rentalSeq: number;
    title: string;
    towns: string[];
    viewCnt: number;
  }[];
}
