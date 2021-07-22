import React, { Component } from 'react';
import firebase from '../../config/firebase';
import GalleryAddition from './edit/add-new-other';

const db = firebase.default.firestore()

class OtherMedia extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            images: [],
            info: []
        }
    }

componentDidMount() {
    this.getMyImages()
}



getMyImages = async () => {
    await db
    .collection( 'OtherMedia' ).doc(`${this.props.data.id}`)
    .collection('images')
    .get()
    .then(docs => {
        if(!docs.empty) {
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
                this.setState({
                    isLoaded: true
                })
            })
        }
    })
    // console.log(this.props)
}

render() {
    return (
        <div className="OtherProjectContainer">
            <div className='ImageContainerOther'>
          
         {
                    
                        this.state.images.map((image, index) => 
                         
                            <OtherMediaImages
                            key={index} 
                            data={image}
                            
                            />
                        )
                       
                        
                }
                
          </div>
          <div>
              <GalleryAddition data={this.props.data}/>
          </div>
          <div className="conceptual-spacer"></div>
    </div>
    )}
}


const OtherMediaImages = (props) => {
    return (
        <div className="OtherMediaImages">
            <div className="OtherImageContainer">
                <img
                src={props.data.featuredImage}
                />
            </div>
            
        </div>
    )
}

export default OtherMedia;