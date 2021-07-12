import React from 'react';

const GalleryContent = (props) => {
    return (
        <div className="GalleryImg">
            <div className="test">
            {(props.data.test)}
            </div>
            {/* <img 
            top
            width="150px"
            src={this.props.data.featuredImage}
            alt="Card Image"
            className="GalleryImg"
            /> */}
        </div>
    )
}

export default GalleryContent;