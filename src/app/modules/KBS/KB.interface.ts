export type variant = {
  type: string;
  value: string;
};
export type inventory = {
  quantity: number;
  inStock: boolean;
};
export type KB = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: variant[];
  inventory: inventory;
};

export default KB;
