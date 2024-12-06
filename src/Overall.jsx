
import { Button } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FillInTheBlanks from './FillTheBlanks.jsx'
import {MatchItemsToCategories} from "./Categorize.jsx";
import Comprehension from './Comprehension.jsx'
import {Routes, Route, NavLink, useNavigate} from 'react-router-dom'


export default function Overall(){
 const navigate = useNavigate()

    const handleSubmit = ()=>{
        document.write(`
                <html>
                    <head>
                    <title>Submission Response</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f9f9f9;
                        color: #333;
                        }
                        .container {
                        text-align: center;
                        }
                        h1 {
                        font-size: 2rem;
                        margin-bottom: 20px;
                        }
                        button {
                        background-color: #007bff;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                        }
                        button:hover {
                        background-color: #0056b3;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <h1>Your response has been submitted successfully!</h1>
                        <button onclick="window.location.href='http://localhost:5175/'">Go Back</button>
                    </div>
                    </body>
                </html>
`);

        
    }
    return(
        <div>
            
            <DndProvider backend={HTML5Backend}> 
                <MatchItemsToCategories />
                <FillInTheBlanks />
                <Comprehension />
            </DndProvider>
            
            <Button onClick={handleSubmit} style={{display:"block",margin:'auto',width:"10%"}}>
                submit
            </Button>
          
        </div>
    )
}
