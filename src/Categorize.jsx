import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";


export  function MatchItemsToCategories  ()  {
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1", items: [] },
    { id: 2, name: "Category 2", items: [] },
  ]);

  const [items, setItems] = useState([
    { item: "Item 1", belongsTo: "Category 1" },
    { item: "Item 2", belongsTo: "Category 2" },
  ]);

  useEffect(()=>{
    const fetchData = async()=>{
        try{
            const response = await fetch('https://superassistant-backend-server.onrender.com/api/getForms')
            const result = await response.json()

            const serverData = result.data[0]
            const fetchedCategories = serverData.categories.map((cat)=>({
                id: cat.id,
                name: cat.name,
                items:[]
            }))
            const fetchedItems = serverData.items.map((item)=>({
                item: item.item, 
                belongsTo : item.belongsTo,
            }))

            setCategories(fetchedCategories)
            setItems(fetchedItems)
        }catch{
            console.error("Error fetching data", error)
        }
    }
  fetchData()
  },[])

  const handleDrop = (droppedItem, categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);

    // Avoid duplicate items in the same category
    if (!category.items.some((item) => item.item === droppedItem.item)) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, items: [...cat.items, droppedItem] }
            : cat
        )
      );

      setItems((prevItems) =>
        prevItems.filter((item) => item.item !== droppedItem.item)
      );
    }
  };

  function DraggableItem  ({ item })  {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "ITEM",
      item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <Card
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: "#e1c6ff",
          padding: "10px 20px",
          margin: "5px 0",
          cursor: "pointer",
        }}
      >
        {item.item}
      </Card>
    );
  };

  function DroppableCategory  ({ category })  {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "ITEM",
      drop: (droppedItem) => handleDrop(droppedItem, category.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <Card
        ref={drop}
        style={{
          backgroundColor: isOver ? "#d3f9d8" : "#f8f9fa",
          padding: "10px",
          minHeight: "100px",
        }}
      >
        <Card.Title>{category.name}</Card.Title>
        {category.items.map((item, idx) => (
          <Card
            key={idx}
            style={{
              backgroundColor: "#e1c6ff",
              padding: "10px 20px",
              margin: "5px 0",
            }}
          >
            {item.item}
          </Card>
        ))}
      </Card>
    );
  };

  return (
    <Card style={{margin:"2rem",padding:"1rem"}}>
    <Container style={{ marginTop: "20px" }}>
        <h2 style={{color:"red"}}>Question 1</h2>
      <h3>Match the Items to Categories</h3>
      <Row>
        <Col md={4}>
          <h5>Items</h5>
          {items.map((item, idx) => (
            <DraggableItem key={idx} item={item} />
          ))}
        </Col>
        <Col md={8}>
          <h5>Categories</h5>
          <Row>
            {categories.map((category) => (
              <Col md={6} key={category.id}>
                <DroppableCategory category={category} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
    </Card>
  );
};


