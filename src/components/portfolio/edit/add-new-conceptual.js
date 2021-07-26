import React, { Component } from 'react';
    import {Container, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
    import 'react-quill/dist/quill.snow.css'
    import firebase from "firebase";
    import { v4 as uuidv4 } from 'uuid'
    import { makeStyles } from '@material-ui/core/styles';
    import Modal from '@material-ui/core/Modal';
    import { useAuth } from '../../../contexts/AuthContext';
    import { withRouter } from 'react-router';
    
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
      
      export default function GalleryAddition(props) {
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
          <div>
            <button type="button" onClick={handleOpen}>
              Add New Images
            </button>
            <Modal
              open={open}
              onClose={handleClose}
            >
          <div className='Edit'>
          <AddNewConceptual data={props.data.id}/>
          </div>
            </Modal>
          </div> ) : null
        );
      }
    
    class AddNewConceptual extends Component {
        constructor(props) {
            super(props);
            
            this.state={
                article: {
                    featuredImage: '',
                    createDate: new Date()
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

    
        submitArticle = async (props) => {
            const article = this.state.article

           await db.collection( 'Conceptual' ).doc(`${this.props.data}`).collection("Slideshow")
           .add(
               article
           )
           
           .catch( err => console.log(err))
           location.reload()
           
   }

                
    
        uploadImageCallBack = (e) => {
            return new Promise(async(resolve, reject) => {
                const file = e.target.files[0]
                const fileName = uuidv4()
                storageRef.ref().child("Conceptual/" + fileName).put(file)
                .then( async snapshot => {
                    
                    const downloadURL = await storageRef.ref().child("Conceptual/" +fileName).getDownloadURL()
    
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
                                
                    <Col className='right-column'>
                    <h2 className='SectionTitle'>Add Images</h2>
                                <FormGroup className='edit-featured-image'> Featured Image
                                    <Input type="file" accept='image/*' className="image-uploader"
                                    onChange={async (e) => {
                                        const uploadState = await this.uploadImageCallBack(e)
                                        if(uploadState.success) {
                                            this.setState({
                                                hasFeaturedImage: true,
                                                article: {
                                                    ...this.state.article,
                                                    featuredImage: uploadState.data.link
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
                                </FormGroup>
                                <FormGroup className='edit-status-button'>
                                    <Button className='edit-submit'
                                    onClick={() => {this.submitArticle();}}>
                                        Submit
                                    </Button> 
                                </FormGroup>
                    </Col>
                </Row>
                </Container>
            );
        }
    }