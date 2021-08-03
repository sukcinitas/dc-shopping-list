const mockProducts = [{user_id: 1, id: 1, name: 'Pork', url: '', description: '', category: 'Meats', deletedAt: null}, {user_id: 1, id: 2, name: 'Chicken', url: '', description: '', category: 'Meats', deletedAt: null},
{ user_id: 1, id: 3, name: 'Salmon', url: '', description: '', category: 'Fish', deletedAt: null}];

let mockListsIndex = 5;

let productIndex = 6;

let mockLists = [{id: 4, name: 'Pirmadienio apsipirkimas', created_at: '2021-08-01', state: 'completed', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}]},
{ id: 2, created_at: '2019-10-11', name: 'Pirmas apsipirkimas', state: 'completed', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}] },
{ id: 3, created_at: '2019-10-12', name: 'Monthly', state: 'cancelled', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}] }];

const mockProductsInLists = [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true}];

function formatDate(date: Date) {
  const d = new Date(date),
      year = d.getFullYear();
  let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
      

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

interface ProductToAdd {
  name: string; category: string; url: string; description: string;
}

interface ListItem {
  id: number;
  name: string;
  pieces: number;
  completed: boolean;
  category: string;
  user_id: number;
  list_id: number;
  units: number;
  product_id: number;
}

interface List {
  id: number|undefined;
  name: string;
  items: Array<ListItem>;
  state: string;
}

interface Product {
  id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  deletedAt: null;
}

interface ProductWithUserId extends Product {
    user_id: number;
}

interface SimpleProduct {
  name:string;
  id: number;
  state: string;
  created_at: string;
}

const getProducts = async ():Promise<{products: Array<ProductWithUserId>}> => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ products: [...mockProducts.filter((item) => item.user_id === 1)] });
    }, 300);
});

const addProduct = async (product: ProductToAdd): Promise<{product: Product}> => new Promise((resolve) => {
  setTimeout(() => {
  mockProducts.push({...product, id: ++productIndex, deletedAt: null, user_id: 1 });
    resolve({product: {...product, deletedAt: null, id: ++productIndex}});
  }, 300);
}); 

const removeProduct = async (id: number): Promise<{success: true|false}> => new Promise((resolve) => {
  setTimeout(() => {
    mockProducts.map((item) => {
      if (item.id === id) {
        return {...item, deletedAt: formatDate(new Date())};
      } else {
        return item;
      }
    });
    resolve({ success: true});
  }, 300);
});

const getLists = async (): Promise<Array<SimpleProduct>> => new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLists.filter((item) => item.user_id === 1).map(({ id, state, created_at, name }) => ({name, id, state, created_at})));
    }, 300);
});

const getList = async (id: number): Promise<any> => new Promise((resolve) => {
  setTimeout(() => {
    const list = mockLists.find((item) => item.id === id);
    resolve(list);
  }, 500);
});

const saveActiveList = async (list: any): Promise<{success: true|false, id: number, name: string}> => new Promise((resolve) => {
  setTimeout(() => {
    const id = list.id === undefined ? ++mockListsIndex : list.id;
    if (!list.id) {
      mockLists.push({ ...list, id, created_at: formatDate(new Date()), user_id: 1});
    } else {
      const index = mockLists.findIndex((l: any) => l.id === list.id);
      const item = { ...list, id, created_at: formatDate(new Date()), user_id: 1}
      mockLists.splice(index, 1, item);
    }
    resolve({ success: true, id, name: list.name });
  }, 300);
});

const getActiveList = async () => new Promise((resolve) => {
  setTimeout(() => {
    const list = mockLists.find((list) => list.state === 'active');
    let productsInList;
    if (list) {
      productsInList = mockProductsInLists
      .filter((item) => item.list_id === list.id)
      productsInList = productsInList.map((item) => ({id: item.id, name: 'Pork', pieces: item.units, category: 'Meats', completed: item.completed }));
      resolve({ status: 'success', list: {...list, items: productsInList }});
    } else {
      resolve({ status: 'success', list: []});
    }
  }, 1000);
}); 

const changeActiveListState = async (id: number|undefined, state: 'cancelled'|'completed'): Promise<{success: true|false}> => new Promise((resolve) => {
  setTimeout(() => {
    mockLists = mockLists.map((list) => {
      if (list.id === id) {
        return {...list, state}
      } else {
        return list;
      }
    })
    resolve({ success: true});
  }, 300);
});

const getMontlyStatistics = async (): Promise<Array<{month: string; items: number}>> => 
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ month: 'January', items: 104 }, 
      { month: 'February', items: 104 }, 
      { month: 'March', items: 104 }, 
      { month: 'April', items: 104 }, 
      { month: 'May', items: 104 }, 
      { month: 'June', items: 4 }, 
      { month: 'July', items: 10 }, 
      { month: 'August', items: 204 }, 
      { month: 'September', items: 104 }, 
      { month: 'October', items: 304 }, 
      { month: 'November', items: 14 }, 
      { month: 'December', items: 104 }, ]);
  }, 300);
});

const getTopItems = async (): Promise<Array<{name: string, percent: number}>> => 
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ name: 'Banana', percent: 14 },{ name: 'Beef', percent: 40 },{ name: 'Beer', percent: 27 }]);
  }, 300);
});

const getTopCategories = async (): Promise<Array<{name: string; percent: number}>> => 
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ name: 'Meats', percent: 80 },{ name: 'Drinks', percent: 15 },{ name: 'Vegetables', percent: 5 }]);
  }, 300);
});

export default {
  addProduct,
  removeProduct,
  getProducts,
  getList,
  getLists,
  getActiveList,
  saveActiveList,
  changeActiveListState,
  getMontlyStatistics,
  getTopCategories,
  getTopItems,
}