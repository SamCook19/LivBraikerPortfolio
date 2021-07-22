import React, { Component } from 'react';
import firebase from '../../config/firebase';
import parse from 'html-react-parser';
import TarotImg from './tarotimg';
import { useAuth } from '../../contexts/AuthContext';

const db = firebase.default.firestore()

function RemoveProject (props) {
    const db = firebase.default.firestore()

async function removeProject() {
    await db.collection("Tarot").doc(`${props.data.id}`)
        .delete()
        
            .catch( err => console.log(err))
            location.reload()
}

  const { currentUser } = useAuth();

  return (
    currentUser ? (
        <button onClick={() => removeProject(props.data.id)}>Delete Project</button>
        ): null 

  );
}

class TarotCards extends Component {
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
        .collection( 'Tarot' )
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
                <div className="tarot-header">
                <h1 className="display-4">Tarot Cards</h1>
                </div>
                <div>
                {
                    this.state.isLoaded ?
                    this.state.info.map((info, index) => {
                        return(
                            <div className="tarot-container">
                            <div>
                            <OtherContent className="OtherContent"
                            key={index}
                            data={info}
                            />
                            </div>
                            <div>
                            <TarotImg className="ConceptualSlideshow"
                            key={index}
                            data={info}/>
                            </div>
                            <div className="deleteproject">
                                <RemoveProject />
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
        <h2 className= "OtherTitle">
            {parse(props.data.title)}
            </h2>
        </div>
        
    )
}


export default TarotCards;