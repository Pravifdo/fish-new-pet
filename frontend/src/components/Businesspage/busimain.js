import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BusinessPage() {
  const [fishProducts, setFishProducts] = useState([
    { id: 1, name: 'Salmon', brand: 'OceanFresh', price: 12.99, stock: 50 },
    { id: 2, name: 'Tuna', brand: 'SeaKing', price: 15.49, stock: 30 },
  ]);
  const [newFish, setNewFish] = useState({ name: '', brand: '', price: '', stock: '' });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const addFish = () => {
    if (!newFish.name || !newFish.brand || !newFish.price || !newFish.stock) return;
    const newId = fishProducts.length + 1;
    setFishProducts([...fishProducts, { 
      id: newId, 
      name: newFish.name, 
      brand: newFish.brand, 
      price: parseFloat(newFish.price), 
      stock: parseInt(newFish.stock) 
    }]);
    setNewFish({ name: '', brand: '', price: '', stock: '' });
  };

  const deleteFish = (id) => {
    setFishProducts(fishProducts.filter(fish => fish.id !== id));
  };

  const updateStock = (id, newStock) => {
    setFishProducts(fishProducts.map(fish => 
      fish.id === id ? { ...fish, stock: parseInt(newStock) } : fish
    ));
  };

  const updatePrice = (id, newPrice) => {
    setFishProducts(fishProducts.map(fish => 
      fish.id === id ? { ...fish, price: parseFloat(newPrice) } : fish
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>🐟 Business Owner Panel</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Add New Fish Form */}
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h3>Add New Fish Product</h3>
        <input 
          placeholder="Fish Name" 
          value={newFish.name} 
          onChange={(e) => setNewFish({...newFish, name: e.target.value})}
        />
        <input 
          placeholder="Brand" 
          value={newFish.brand} 
          onChange={(e) => setNewFish({...newFish, brand: e.target.value})}
        />
        <input 
          placeholder="Price ($)" 
          type="number" 
          value={newFish.price} 
          onChange={(e) => setNewFish({...newFish, price: e.target.value})}
        />
        <input 
          placeholder="Stock (kg)" 
          type="number" 
          value={newFish.stock} 
          onChange={(e) => setNewFish({...newFish, stock: e.target.value})}
        />
        <button onClick={addFish}>➕ Add Fish</button>
      </div>

      {/* Fish Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {fishProducts.map(fish => (
          <div key={fish.id} style={{ 
            border: '1px solid #2196F3', 
            borderRadius: '10px', 
            padding: '15px', 
            width: '250px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3>{fish.name}</h3>
            <p><strong>Brand:</strong> {fish.brand}</p>
            <p><strong>Price:</strong> ${fish.price} / kg</p>
            <p><strong>Stock:</strong> {fish.stock} kg</p>
            
            {/* Update Stock */}
            <div>
              <label>Update Stock: </label>
              <input 
                type="number" 
                defaultValue={fish.stock} 
                onBlur={(e) => updateStock(fish.id, e.target.value)}
                style={{ width: '70px' }}
              />
            </div>

            {/* Update Price */}
            <div>
              <label>Update Price: </label>
              <input 
                type="number" 
                step="0.01" 
                defaultValue={fish.price} 
                onBlur={(e) => updatePrice(fish.id, e.target.value)}
                style={{ width: '70px' }}
              />
            </div>

            <button onClick={() => deleteFish(fish.id)} style={{ 
              marginTop: '10px', 
              backgroundColor: '#ff4444', 
              color: 'white' 
            }}>
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessPage;