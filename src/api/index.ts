const mockProducts = [{user_id: 1, id: 1, name: 'Pork', url: '', description: '', category: 'Meats', deletedAt: null}, {user_id: 1, id: 2, name: 'Chicken', url: '', description: '', category: 'Meats', deletedAt: null},
{ user_id: 1, id: 3, name: 'Salmon', url: '', description: '', category: 'Fish', deletedAt: null}];

let mockListsIndex = 5;

let mockLists = [{id: 4, name: 'Pirmadienio apsipirkimas', created_at: '2021-08-01', state: 'completed', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}]},
{ id: 1, created_at: '2020-10-11', name: 'Pirmas apsipirkimas', state: 'active', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}] },
{ id: 2, created_at: '2019-10-11', name: 'Pirmas apsipirkimas', state: 'completed', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}] },
{ id: 3, created_at: '2019-10-12', name: 'Monthly', state: 'cancelled', user_id: 1, items: [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true, category: 'Meats', pieces: 2, name:'Pork'}] }];

const mockProductsInLists = [{id: 1, user_id: 1, list_id: 1, units: 2, product_id: 1, completed: true}];

interface ProductToAdd {
  name: string; category: string; url: string; description: string;
}

// interface Product extends ProductToAdd {
//     id: number; 
//     user_id: number;
//     deleted_at: string|null;
// }

// interface ProductInList {
//     id: number;  
//     user_id: number;
//     list_id: number;
//     units: number;
//     completed: boolean;
//     product_id: number;
// }

const getProducts = async () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ products: [...mockProducts.filter((item) => item.user_id === 1)] });
    }, 300);
});

const addProduct = async (product: ProductToAdd) => new Promise((resolve, reject) => {
  setTimeout(() => {
  mockProducts.push({...product, id: 6, deletedAt: null, user_id: 1 });
    resolve({product: {...product, deletedAt: null, id: 6}});
  }, 300);
}); 

const removeProduct = async (id: number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    mockProducts.map((item) => {
      if (item.id === id) {
        return {...item, deletedAt: '2022-08-16'}
      } else {
        return item;
      }
    });
    resolve({ success: true});
  }, 300);
});

const getLists = async () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockLists.filter((item) => item.user_id === 1).map(({ id, state, created_at, name }) => ({name, id, state, created_at})));
    }, 300);
});

const getList = async (id: number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const list = mockLists.find((item) => item.id === id);
    resolve(list);
  }, 300);
});

const saveActiveList = async (list:any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const id = list.id === undefined ? ++mockListsIndex : list.id;
    console.log(list.id, 'id');
    if (!list.id) {
      mockLists.push({ ...list, id, created_at: '2025-08-25', user_id: 1});
    } else {
      const index = mockLists.findIndex((l: any) => l.id === list.id);
      const item = { ...list, id, created_at: '2025-08-25', user_id: 1}
      mockLists.splice(index, 1, item);
    }
    resolve({ success: true, id, name: list.name });
  }, 300);
});

const getActiveList = async () => new Promise((resolve, reject) => {
  setTimeout(() => {
    const list = mockLists.find((list) => list.state === 'active');
    let productsInList;
    if (list) {
      productsInList = mockProductsInLists
      .filter((item) => item.list_id === list.id)
      productsInList = productsInList.map((item) => ({id: item.id, name: 'Mesa', pieces: item.units, category: 'Meats', completed: item.completed }));
      resolve({ status: 'success', list: {...list, items: productsInList }});
    } else {
      resolve({ status: 'success', list: []});
    }
  }, 300);
}); 

const changeActiveListState = async (id: number, state: 'cancelled'|'completed') => new Promise((resolve, reject) => {
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

const getMontlyStatistics = async () => 
  new Promise((resolve, reject) => {
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

const getTopItems = async () => 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ name: 'Banana', percent: 14 },{ name: 'Beef', percent: 40 },{ name: 'Beer', percent: 27 }]);
  }, 300);
});

const getTopCategories = async () => 
  new Promise((resolve, reject) => {
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