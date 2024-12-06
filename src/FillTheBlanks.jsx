import  { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from "react-bootstrap";
import {  useDrag, useDrop } from "react-dnd";

import axios from 'axios'


const FillInTheBlanks = () => {
  const [data, setData] = useState({
    sentence: "I am a ___ boy and I ___ a full ___",
    underlined: ["have", "good", "stack"],
  });


  useEffect(()=>{
    async function handleData (){
        const dataFrom = await axios.get('https://superassistant-backend-server1.onrender.com/api/getfillForm')
        console.log(dataFrom.data.data[0])
        setData({
            sentence: dataFrom.data.data[0].sentence,
            underlined : dataFrom.data.data[0].underlined
        })
        console.log(data)
    }
    handleData()
  },[])
  const [placedWords, setPlacedWords] = useState([]);

  const words = data.sentence.split(" ").map((word, index) => ({
    text: word.includes("___") ? "___" : word,
    index,
  }));

  const handleDrop = (droppedWord, dropIndex) => {
    setPlacedWords((prev) => {
      const updatedWords = [...prev];
      updatedWords[dropIndex] = droppedWord;
      return updatedWords;
    });

    setData((prev) => ({
      ...prev,
      underlined: prev.underlined.filter((word) => word !== droppedWord),
    }));
  };

  const DraggableWord = ({ word }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "word",
      item: { word },
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
          margin: "5px",
          cursor: "pointer",
        }}
      >
        {word}
      </Card>
    );
  };

  const DroppablePlaceholder = ({ index }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "word",
      drop: (item) => handleDrop(item.word, index),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    return (
      <span
        ref={drop}
        style={{
          display: "inline-block",
          backgroundColor: isOver ? "#d3d3d3" : "#f0f0f0",
          padding: "5px 10px",
          margin: "0 5px",
          border: "1px solid #ccc",
          minWidth: "50px",
          textAlign: "center",
          color: "#777",
        }}
      >
        {placedWords[index] || "___"}
      </span>
    );
  };

  return (
    
      <Container style={{ padding: "20px" }}>
        <h2 style={{color:"red"}}>Question 2</h2>
        <Card style={{ padding: "15px" }}>
          <h5>Question 2</h5>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {data.underlined.map((word, idx) => (
              <DraggableWord word={word} key={idx} />
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            {words.map((word, idx) =>
              word.text === "___" ? (
                <DroppablePlaceholder key={idx} index={idx} />
              ) : (
                <span style={{ margin: "0 5px" }}>{word.text}</span>
              )
            )}
          </div>
        </Card>
      </Container>

  );
};

export default FillInTheBlanks;
