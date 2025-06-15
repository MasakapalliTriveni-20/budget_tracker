import React, { useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState(["Food", "Travel", "Rent"]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>
    </div>
  );
};

export default Categories;
