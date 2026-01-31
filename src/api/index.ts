import axios from "axios";

interface ProductToAdd {
  name: string;
  category: string;
  url: string;
  description: string;
}

interface Product {
  product_id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  deleted_at: null;
}

const getProducts = async (): Promise<{ products: Array<Product> }> => {
  const { data } = await axios.get("/api/products");
  return { products: data };
};

const addProduct = async (
  product: ProductToAdd,
): Promise<{ product: Product }> => {
  const {
    data: { product_id },
  } = await axios.post("/api/products", { ...product });
  return { product: { ...product, product_id, deleted_at: null } };
};

const editProduct = async (
  product: ProductToAdd,
  product_id: number,
): Promise<{ product: Product }> => {
  await axios({
    method: "put",
    url: "/api/products/" + product_id,
    data: { ...product },
  });
  return { product: { ...product, product_id, deleted_at: null } };
};

const removeProduct = async (id: number) =>
  await axios.delete(`/api/products/${id}`);

const getLists = async (): Promise<
  Array<{
    list_id: number;
    name: string;
    state: string;
    updated_at: string;
    user_id: number;
  }>
> => {
  const { data } = await axios.get("/api/lists");
  return data;
};

const getList = async (id: number) => {
  const { data } = await axios.get(`/api/lists/${id}`);
  return data;
};

const saveActiveList = async ({
  name,
  state,
  list_id,
  items,
}: {
  name: string;
  state: string;
  list_id: number | undefined;
  items: Array<{
    product_id: number | undefined;
    name: string;
    units: number;
    completed: string;
    category: string;
  }>;
}) => {
  const { data } = await axios.post("/api/lists", {
    name,
    state,
    list_id,
    items,
  });
  return data;
};

const getActiveList = async () => {
  const { data } = await axios.get(`/api/lists/active`);
  return data;
};

const toggleItemCompletion = async (
  list_id: number | undefined,
  id: number | undefined,
  completed: string,
) => {
  const { data } = await axios.put(
    `/api/lists/${list_id}/toggle-item-completion`,
    { id, completed },
  );
  return data;
};

const changeActiveListState = async (
  id: number | undefined,
  state: "cancelled" | "completed",
) => await axios.put(`/api/lists/${id}`, { state });

const getMontlyStatistics = async (): Promise<
  Array<{ month: string; items: number }>
> => {
  const { data: monthlyStatistics } = await axios.get(
    "/api/statistics/monthly-statistics",
  );
  return monthlyStatistics;
};

const getTopItems = async (): Promise<
  Array<{ name: string; percent: number }>
> => {
  const { data: topItems } = await axios.get("/api/statistics/top-items");
  return topItems;
};

const getTopCategories = async (): Promise<
  Array<{ name: string; percent: number }>
> => {
  const { data: topCategories } = await axios.get(
    "/api/statistics/top-categories",
  );
  return topCategories;
};

export default {
  addProduct,
  editProduct,
  removeProduct,
  getProducts,
  getList,
  getLists,
  getActiveList,
  saveActiveList,
  changeActiveListState,
  toggleItemCompletion,
  getMontlyStatistics,
  getTopCategories,
  getTopItems,
};
