import React from 'react';

const TarotImages = (props) => {
    return (
        <div className="TarotSlideshow">
            <div className="TarotGalleryContainer">
                <img
                src={props.data.featuredImage}
                />
            </div>
        </div>
    )
}

export default TarotImages;