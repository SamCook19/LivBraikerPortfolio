import React from 'react';



const GalleryContent = (props) => {
    return (
        <div className="GalleryImg">
            
            <img 
            height= "400px"
            top
            src={props.data.featuredImage}
            alt="Card Image"
            className="GalleryImg"
            />
        </div>
    )
}

export default GalleryContent;

