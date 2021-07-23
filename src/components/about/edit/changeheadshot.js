

import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../contexts/AuthContext';

const db = firebase.default.firestore()
const storageRef = firebase.storage()

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
 
  
  export default function HeadshotModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    const { currentUser } = useAuth();
  
    return (
        currentUser ? (
      <div className="headshotbutton">
        <button type="button" onClick={handleOpen}>
          Change Headshot
        </button>
        <Modal
          open={open}
          onClose={handleClose}
        >
      <div className='HeadshotEdit'>
      <HeadshotEdit />
      </div>
        </Modal>
      </div> ) : null
    );
  }

class HeadshotEdit extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            article: {
                featuredImage: ''
            }
        }
    }

    modules = {
        toolbar: {
            container: [
                [{'header': '1'}, {'header': '2'}, {'font': []}],
                [{size: []}],
                ['bold','italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean'], ['code-block']
            ],
        },
        clipboard: {
            matchvisual: false,
        },
    }

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block'
    ]


    submitEdit = async () => {
        const article = this.state.article
        await db.collection("Headshot").doc("3IzfmDezQJvxXIRETic3")
            .update(
                article
                )
            
            .catch( err => console.log(err))
            location.reload()
    }

    uploadImageCallBack = (e) => {
        return new Promise(async(resolve, reject) => {
            const file = e.target.files[0]
            const fileName = uuidv4()
            storageRef.ref().child("Headshot/" + fileName).put(file)
            .then( async snapshot => {
                
                const downloadURL = await storageRef.ref().child("Headshot/" +fileName).getDownloadURL()

                resolve({
                    success: true,
                    data: {link: downloadURL}
                })
            })
        })
    }

    


    render() {
        return (
            <Container>
            <Row>
                
                    
                   
                
                <div className='edit-article-container'>
                        
                <Col className='edit-column'>
                <h2 className='SectionTitle'>Edit Article</h2>
                            <FormGroup className='edit-featured-image'> Headshot
                                <Input type="file" accept='image/*' className="image-uploader"
                                onChange={async (e) => {
                                    const uploadState = await this.uploadImageCallBack(e)
                                    if(uploadState.success) {
                                        this.setState({
                                            hasFeaturedImage: true,
                                            article: {
                                                ...this.state.article,
                                                headshot: uploadState.data.link
                                            }
                                        })
                                    }
                                }}> 
                                </Input>
                                <div className='image'>
                                {
                                    this.state.hasFeaturedImage ?
                                        <img src={this.state.article.featuredImage} /> : ''
                                }</div>
                                <FormGroup className='edit-status-button'>
                                <Button className='edit-submit'
                                onClick={(e) => this.submitEdit()}>
                                    Submit
                                </Button> 
                            </FormGroup>
                            </FormGroup>
                </Col>
                
                </div>
            </Row>
            </Container>
        );
    }
}