import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  name: "",
  price: "",
  imageUrl: "",
  description: "",
  shipping: ""
};

const UpdateForm = props => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3333/itemById/${id}`)
      .then(res => {
        // morphing of data
        setItem(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    const url = `http://localhost:3333/items/${id}`;
    axios.put(url, item)
      .then(res => {
        // setState()
        console.log(`bk: Updateform.js: handleSubmit: res: `, res);
        // props.setItems(res.data);
        const itemReturned = res.data.find(itm => itm.id === id);
        props.setItems(props.items.map(itm => {
          if (itm.id === itemReturned.id) {
            return itemReturned;
          }
          return itm;
        }));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={item.shipping}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;