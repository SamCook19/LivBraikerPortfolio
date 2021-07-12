import React from 'react';

const GalleryContent = (props) => {
    return (
        <div className="AboutContent">
            <div className="content">
            {props.data.About}
            </div>
           
        </div>
    )
}

export default GalleryContent;