import React, { Component } from 'react';
import firebase from '../../config/firebase';
import parse from 'html-react-parser';
import OtherMedia from './othermedia';

const db = firebase.default.firestore()

class OtherProjects extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            info: [],
            images: [],
        }
    }

    componentDidMount() {
        this.getMyInfo()
    }


    getMyInfo = () => {
        db
        .collection( 'OtherMedia' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let allInfo = []
                docs.forEach(function (doc) {
                    const info = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allInfo.push(info)
                })

                this.setState({
                    info: allInfo
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
            <div className="ConceptualProjectContainer">
                <div>
                {
                    this.state.isLoaded ?
                    this.state.info.map((info, index) => {
                        return(
                            <div>
                            <div>
                            <OtherContent className="OtherContent"
                            key={index}
                            data={info}
                            />
                            </div>
                            <div>
                            <OtherMedia className="ConceptualSlideshow"
                            key={index}
                            data={info}/>
                            </div>
                            </div>
                        )
                    })
                    : ''
                }
                
                 </div>
                 
                
            </div>
        );
    }
}


const OtherContent = (props) => {
    return (
        <div className="OtherContainer">
        <div className= "OtherTitle">
            {parse(props.data.title)}
            </div>
            <div className="OtherSubtitle">
                {parse(props.data.subtitle)}
            </div>
        </div>
        
    )
}


export default OtherProjects;