import React, { Component } from 'react';
import firebase from '../../config/firebase';
import parse from 'html-react-parser';
import OtherMedia from './othermedia';
import { useAuth } from '../../contexts/AuthContext';

import { Remove } from '@material-ui/icons';

const db = firebase.default.firestore()

function RemoveProject (props) {
    const db = firebase.default.firestore()

async function removeProject() {
    await db.collection("OtherMedia").doc(`${props.data.id}`)
        .delete()
        
            .catch( err => console.log(err))
            location.reload()
}

  const { currentUser } = useAuth();

  return (
    currentUser ? (
        <button onClick={() => removeProject()}>Delete Project</button>
        ): null 

  );
}

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


    getMyInfo = async ()  => {
        await db
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
        console.log(this.state.info)
    }


    render() {
        return (
            <div className="OtherProjectContainer">
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
                            <OtherMedia className="OtherSlideshow"
                            key={index}
                            data={info}/>
                            </div>
                            <div className="deleteproject">
                                <RemoveProject key={index}
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
        <h1 className= "OtherTitle">
            {parse(props.data.title)}
            </h1>
            <h2 className="OtherSubtitle">
                {parse(props.data.subtitle)}
            </h2>
        </div>
        
    )
}


export default OtherProjects;