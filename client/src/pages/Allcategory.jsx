import { useState } from "react";
import { Link } from "react-router-dom";
import tablet from "../images/tablet.png";
import kurti from "../images/kurti.webp";
import lipstick from "../images/lipstick.jpeg";
// import jhoomer from "../images/jhoomer1.jpeg";

const Allcategory = () => {
    const [hovered, setHovered] = useState(null); // Track hover state

    const categories = [
        { img: tablet, name: "Electronics", path: "/mobile" },
        { img: kurti, name: "Fashion", path: "/tablet" },
        { img: lipstick, name: "Makeup", path: "/audio" }
        // { img: jhoomer, name: "Decor", path: "/jhoomer" }
    ];

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "space-evenly", 
            gap: "20px", 
            flexWrap: "wrap", 
            padding: "20px" ,
        }}>
            {categories.map((category, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                    <Link 
                        to={category.path} 
                        style={{ textDecoration: "none", color: "black" }}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img 
                            src={category.img} 
                            alt={category.name} 
                            style={{ 
                                width: "150px", 
                                height: "250px", 
                                borderRadius: "10px", 
                                display: "block", 
                                margin: "0 auto" 
                            }} 
                        />
                        <div style={{ 
                            marginTop: "10px", 
                            fontSize: "16px", 
                            fontWeight: "bold",
                            textAlign: "center",
                            textDecoration: hovered === index ? "underline" : "none",
                            transition: "text-decoration 0.3s ease"
                        }}>
                            {category.name}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Allcategory;
