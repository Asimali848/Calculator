declare type StripePaySession = {
  id: string;
};

declare type PostItem = {
  name: string;
  description: string;
};

declare type GetItem = {
  id: number;
  name: string;
  description: string;
};

declare type Competitor = {
  name: string;
  website: string;
  address: string;
  postal_code: string;
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  soft_delete: boolean;
  website_name: string;
};

declare type Supplier = {
  name: string;
  website: string;
  address: string;
  contact_number: string;
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  soft_delete: boolean;
};

declare type BaseProduct = {
  id: number;
  user_id: string;
  file_info_id: number;
  sku: string;
  status: string;
  product_name: string;
  category: string;
  price: number;
  size: string;
  color: string;
  stock: number;
  supplier_id: number;
  is_seo_optimized: boolean;
  seo_optimized_description: string;
  supplier_name: string;
  image_url: string;
  warranty: string;
  material: string;
  manufacturer_code: string;
  bar_code: string;
  technical_specifications: string;
  description: string;
  total_variants: number;
  tags: string[];
};

declare type Product = {
  message: string;
  status_code: number;
  data: BaseProduct[];
};

declare type GlobalStateProps = {
  uploaded: Product[] | null;
  selectedProducts: number[];
  service: string;
};

declare type UpdateUser = {
  last_name: string;
  first_name: string;
  phone_number: string;
  state: string;
  postal_code: string;
  email: string;
  country: string;
  city: string;
  profile_picture_url: string;
};

declare type User = {
  id: string;
  email: string;
  country: string;
  city: string;
  profile_picture_url: string;
  created_at: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  postal_code: number;
  is_verified: boolean;
  updated_at: string;
};

declare type DownloadProducts = {
  id: number;
  product_name: string;
  seo_optimized_description: string;
  price: number;
  description: string;
  tags: string[];
};

declare type ProductData = {
  id: number;
  product_name: string;
  category: string;
  price: number;
};

declare type LocalProduct = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
};

declare type ProductDetail = {
  message: string;
  status_code: number;
  data: {
    id: number;
    user_id: string;
    file_info_id: number;
    sku: string;
    status: string;
    product_name: string;
    price: number;
    size: string;
    color: string;
    stock: number;
    supplier_id: number;
    is_seo_optimized: boolean;
    seo_optimized_description: string;
    supplier_name: string;
    image_url: string;
    warranty: string;
    material: string;
    manufacturer_code: string;
    bar_code: string;
    technical_specifications: string;
    description: string;
    total_variants: number;
    tags: [string];
  };
};

declare type ProductVariant = {
  id: number;
  user_id: string;
  parent_product_id: number;
  file_info_id: number;
  sku: string;
  product_name: string;
  price: number;
  size: string;
  color: string;
  stock: number;
  supplier_id: number;
  is_seo_optimized: boolean;
  seo_optimized_description: string;
  supplier_name: string;
  image_url: string;
  warranty: string;
  material: string;
  manufacturer_code: string;
  bar_code: string;
  technical_specifications: string;
  description: string;
  tags: [string];
};

declare type AddVariants = {
  parent_product_id: number;
  price: number;
  size: string;
  color: string;
  stock: number;
  supplier_id: number;
  is_seo_optimized: boolean;
  image_url: string;
  warranty: string;
  material: string;
  manufacturer_code: string;
  bar_code: string;
  technical_specifications: string;
  description: string;
  tags: string[];
};

declare type Dashboard = {
  total_products: number;
  total_suppliers: number;
  total_competitors: number;
};

declare type DashboardGraph = {
  [month: string]: {
    seo_products: number;
    non_seo_products: number;
  };
};

declare type Setting = {
  id: number;
  ai_agent: string;
  api_key: string;
  ai_language: string;
  tone: string;
};
