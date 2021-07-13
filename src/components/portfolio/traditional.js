import React, { Component } from 'react';
import firebase from '../../config/firebase';

const db = firebase.default.firestore()

class Traditional extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded:false,
            images: []
        }
    }

    componentDidMount() {
        this.getMyImages()
    }

    getMyImages = () => {
        db
        .collection( 'Traditional' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let allImages = []
                docs.forEach(function (doc) {
                    const image = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allImages.push(image)
                })

                this.setState({
                    images: allImages
                }, () => {
                    this.setState ({
                        isLoaded: true
                    })
                })
              }
            })
          }

    render() {
        return (
            <div className="TraditionalGalleryContainer">
                {
                    this.state.isLoaded ?
                    this.state.images.map((image, index) => {
                        return(
                            <TraditionalContent className="Traditionalcontent"
                            key={index}
                            data={image}
                            />
                        )
                    })
                    : ''
                }
                
            </div>
        );
    }
}

const TraditionalContent = (props) => {
    return (
        <div className="ImageContainer">
        <div className="TraditionalImage">
            <img
            src={props.data.featuredImage}
            alt="Card Image"
            className="Traditional-img"
            />
        </div>
        </div>
    )
}

export default Traditional;