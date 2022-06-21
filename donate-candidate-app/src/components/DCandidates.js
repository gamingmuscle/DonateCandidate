import React,{useState,useEffect} from "react";
import { connect } from  "react-redux";
import * as actions  from "../actions/DCandidate";
import {Grid,Paper,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,withStyles, ButtonGroup,Button} from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useToasts} from "react-toast-notifications";
import {Link} from "react-router-dom"

//  Styling
const styles = theme =>({
    paper:{
        margin:theme.spacing(2),
        padding:theme.spacing(2)
    },
    root:{
        "& .MuiTableCell-head":{
            fontSize:"1.25rem",
            fontWeight: "bold",
            color:"green"
        }
    }
})
//  DCandidates
//  builds a table view of all Donation Candidates
//
//  param[in] classes object contains stayling info
//  param[in] props object data store
//
//  returns component
const DCandidates = ( {classes,...props} )=>{
    
    //for toast msg
    const {addToast} = useToasts()
    useEffect(()=>{ 
        props.fetchAllDCandidates() // fetch all candidates
    },[])
    //  Delete
    //  Confirms users action, before3 making the delete call
    const onDelete = id =>{
        if(window.confirm('Do you want to delete this record?'))
            props.deleteDCandidate(id,()=>addToast("Record Deleted.",{apperance:'info'}))
    }

    //return the component
    return (
    <Paper className={classes.paper} elevation={3}>
        <Grid container>
            <Grid item={true} xs={2}>
                
            </Grid>
            <Grid item={true} xs={8}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Blood Type</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.dCandidateData.map((record,index)=>{
                                    return (
                                        <TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.age}</TableCell>
                                            <TableCell>{record.phone}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Link to={{pathname:"/Submit/"+record.id}}>
                                                        <Button>
                                                            <EditIcon color="primary"></EditIcon>
                                                        </Button>
                                                    </Link>
                                                    <Button onClick={()=> onDelete(record.id)}>
                                                        <DeleteIcon color="secondary"></DeleteIcon>
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item={true} xs={2}>
                
            </Grid>
        </Grid>
    </Paper>);
}
//  Map state data to props.dCandidateData
const mapStateToProps = state => ({
    dCandidateData:state.dCandidate.data
});

//  Map actions to props
const mapActionToProps = {
    fetchAllDCandidates:actions.fetchall,
    deleteDCandidate:actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DCandidates));