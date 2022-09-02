
import axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Card, CloseButton, Col, Container, Row, Table } from 'react-bootstrap'
import StudentModal from './StudentModal'

export class Student extends Component {

    //modal manage
    constructor(props){
        super(props);

        this.state = {
            modal : {
                status: false,
                type: ''
            },
            alert : {
                status : false,
                msg : '',
                type : ''
            },
            students : [],
            dataId : null,
            student : {
                id : '',
                name :'',
                cell : '',
                photo : ''
            }          
        }
    }

  render() {

    const {modal, students, dataId, student} = this.state;
    const {status, msg, type} = this.state.alert;

    const getAllStudentData = () => {
        
        try {
                axios.get('http://localhost:5050/students').then( res => {
                this.setState( (prevState) => ({
                    ...prevState,
                    students : res.data

                }));
            })
        }catch( err ){
            console.log(err);

        }
    }

    getAllStudentData()
    

    const handleModalShow = () => {
        this.setState({
            ...this.state,
            modal: {
                status : true,
                type : 'create'
            }

        })
    }

    const handleModalHide = () =>{
        this.setState({
            ...this.state,
            modal: {
                status : false,
                type : ''
            }
        })
    }

    const handleAlertShow = () => {
        this.setState({
            ...this.state,
            alert : {
                status : true,
                msg : 'this is alert',
                type : 'danger'
            }
        })
    }
    
    const handleAlertHide = () => {
        this.setState({
            ...this.state,
            alert : {
                status : false,
                msg : '',
                type : ''
            }
        })
    }
    //handleStudentSingleModal

    const handleStudentSingleModal = (e, id) => {
        e.preventDefault()

        let single = students.find( (data) => data.id === id );
        

        this.setState( (prevState) => ({
            ...prevState,
            modal : {
                status: true,
                type : 'show'
            },
            student : single

        }))
    }

    //handleModalAlert
    const handleModalAlert = (e, id) => {
        e.preventDefault()

        this.setState( (prevState) => ({
            ...prevState,
            modal : {
                status : true,
                type : 'alert'
            },
            dataId : id

        }))

    }

    // handleDataEdit
    const  handleDataEdit = (e, id) => {
        e.preventDefault()

        let edit = students.find( (data) => data.id === id )

        this.setState( (prevState) => ({
            ...prevState,
            modal : {
                status: true,
                type : 'edit'
            },
            student : edit

        }))

    }
    //student single data handler
    const handleStudentData = (obj) => {
        
        this.setState((prevState) => ({
            ...prevState,
            student: obj

        }))
        
    }


    return (
      <>
        <Container>
            <Row className='justify-content-center my-5'> 
                <Col md={6}>
                    <br />
                    <br />
                    {
                        status && <Alert className='d-flex justify-content-between' variant={type}>{msg} <CloseButton onClick={ handleAlertHide }></CloseButton></Alert>
                    }
                    <Card>
                        <Card.Body>
                            <Button onClick={ handleModalShow } variant='info'>Add Nue Student</Button>
                            <StudentModal  handleStudentData={ handleStudentData } student={ student } dataId={ dataId } show={ modal.status } handleModalHide={ handleModalHide } type={ modal.type }></StudentModal>
                            <hr />
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Cell</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map( (data, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td>{data.cell}</td>
                                                <td><img style={{width: '60px', height: '60px'}} src={data.photo} alt="" /></td>
                                                <td>
                                                
                                                    <a  onClick={ e => handleStudentSingleModal(e, data.id) } className='btn btn-primary btn-sm' href="#" >View</a>&nbsp;
                                                    <a  onClick={ e => handleDataEdit(e, data.id)}className='btn btn-info btn-sm' href="#">Edit</a>&nbsp;
                                                    <a  onClick={ e => handleModalAlert(e, data.id) } className='btn btn-danger btn-sm' href="#">Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                   
                                   
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
      </>
    )
  }
}

export default Student