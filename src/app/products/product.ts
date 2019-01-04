export interface IProduct {
  id: string;
  name: string;
  links: string;
  priceRange: string;
  hero: string;
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  images: Array<{href: string, index: number, isSelected: boolean}>;
}

