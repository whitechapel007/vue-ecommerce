import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from '../productStore';
import { products } from '../../mocks/products';

describe('Product Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with products', () => {
    const store = useProductStore();
    expect(store.allProducts.length).toBeGreaterThan(0);
    expect(store.allProducts).toEqual(products);
  });

  it('filters products by category', () => {
    const store = useProductStore();
    const category = store.categories[0];
    
    store.setFilter({ category });
    
    expect(store.filteredProducts.length).toBeGreaterThan(0);
    expect(store.filteredProducts.every(product => product.category === category)).toBe(true);
  });

  it('filters products by price range', () => {
    const store = useProductStore();
    const minPrice = 500;
    const maxPrice = 1000;
    
    store.setFilter({ minPrice, maxPrice });
    
    expect(store.filteredProducts.every(product => 
      product.price >= minPrice && product.price <= maxPrice
    )).toBe(true);
  });

  it('sorts products by price ascending', () => {
    const store = useProductStore();
    
    store.setSortBy('price-asc');
    
    const prices = store.filteredProducts.map(product => product.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i-1]);
    }
  });

  it('sorts products by price descending', () => {
    const store = useProductStore();
    
    store.setSortBy('price-desc');
    
    const prices = store.filteredProducts.map(product => product.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i-1]);
    }
  });

  it('searches products by title', () => {
    const store = useProductStore();
    const searchTerm = 'iPhone';
    
    store.setSearchQuery(searchTerm);
    
    expect(store.filteredProducts.length).toBeGreaterThan(0);
    expect(store.filteredProducts.every(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )).toBe(true);
  });

  it('paginates products correctly', () => {
    const store = useProductStore();
    const itemsPerPage = store.itemsPerPage;
    
    // First page
    store.setPage(1);
    expect(store.paginatedProducts.length).toBeLessThanOrEqual(itemsPerPage);
    
    // Second page if available
    if (store.totalPages > 1) {
      store.setPage(2);
      expect(store.paginatedProducts.length).toBeLessThanOrEqual(itemsPerPage);
    }
  });

  it('gets product by id', () => {
    const store = useProductStore();
    const product = store.allProducts[0];
    
    const foundProduct = store.getProductById(product.id);
    
    expect(foundProduct).toEqual(product);
  });

  it('gets related products', () => {
    const store = useProductStore();
    const product = store.allProducts[0];
    
    const relatedProducts = store.getRelatedProducts(product);
    
    expect(relatedProducts.length).toBeGreaterThan(0);
    expect(relatedProducts.every(p => p.category === product.category && p.id !== product.id)).toBe(true);
  });
});
