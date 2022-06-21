import React,{useState,useEffect} from "react";
import {Paper,Grid,InputLabel,TextField, withStyles,FormControl,Select,MenuItem,Button, FormHelperText} from "@material-ui/core";
import useForm from "./useForm"
import { RecentActorsSharp } from "@material-ui/icons";
import { connect } from  "react-redux";
import * as actions  from "../actions/DCandidate";
import { useToasts } from  "react-toast-notifications";
import {useParams} from "react-router-dom"

//  Initial form values
const initFieldValues = {
    fullName:"",
    phone:"",
    email:"",
    address:"",
    age:"",
    bloodGroup:""
}
//  Styling
const styles = theme => ({ 
    paper:{
        margin:theme.spacing(2),
        padding:theme.spacing(2)
    },
    root:{
        '& .MuiTextField-root':{
            margin: theme.spacing(1),
            minWidth:230
        }
    },
    formControl:{
        margin: theme.spacing(1),
        minWidth:230
    },
    button:{
        margin: theme.spacing(1)
    }
})
//  DCandidateForm
//
//
//  param[in] classes object styling object
//  param[in] props object data store
const DCandidateForm = ( {classes, ...props} ) => {
   //for Toast msg
    const { addToast} = useToasts()
    const {  //form helpers from useForm
        values,
        setValues,
        handleInputChange,
        inputLabel,
        labelWidth,
        setLabelWidth,
        handleFormSubmit,
        validateForm,
        validationPatterns,
        setValidationPatterns,
        errors,
        setErrors,
        resetForm
    } = useForm(initFieldValues,props,addToast)    
    
    const [currentId,setCurrentId]= useState(useParams().id)
    props.currentId=currentId;
    props.setCurrentId=setCurrentId;
    //const {currentId}=useParams();
    
    useEffect(()=>{ 
        
        if(currentId!=0 && currentId !=null)//load existing candidate data
        {
            props.fetchDCandidate(currentId,()=>{
            setValues({
                ...props.dCandidateData.find(x=> x.id == currentId)
            })
            setErrors({})})
        }
    },[props.currentId])
    //set validation patterns
    setValidationPatterns({fullName:{required:true,pattern:"^....+$"},email:{required:true,pattern:"^.*@.*..*$"},phone:{required:true,pasttern:"^[0-9- ()]{8,16}$"},bloodGroup:{required:true,pattern:"^(?:A|B|AB|O)(?:[+-])$"}})
    //blood types
    const BloodTypes=["A+","A-","B+","B-","AB+","AB-","O+","O-"]
    

    //return component
    return (  
        
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleFormSubmit}>
        <Grid container>
            <Grid item={true} xs={4}></Grid>
            <Grid item={true} xs={4}>
                <Paper className={classes.paper} elevation={3}>
                    <h1 class="m-2">Blood Donation Candidate Form</h1>
                    <Grid container justify="center">
                    <TextField fullWidth id="dcandidate_fullname" name="fullName" variant="outlined" label="Full Name" value={values.fullName} onChange={handleInputChange} {...(errors.fullName && {error:true,helperText:errors.fullName})}/>
                    <TextField fullWidth id="dcandidate_email" name="email" variant="outlined" label="Email" value={values.email} onChange={handleInputChange}  {...(errors.email && {error:true,helperText:errors.email})} />
                    <FormControl fullWidth variant="outlined" className={classes.formControl} {...errors.bloodGroup && {error:true}}>
                        <InputLabel ref={inputLabel} id="dcandidate_bloodtype_label">Blood Type</InputLabel>
                        <Select id="dcandidate_bloodgroup" name="bloodGroup" value={values.bloodGroup} onChange={handleInputChange} labelId="dcandidate_bloodtype_label" labelWidth={labelWidth}>
                            <MenuItem value="">Select Blood Type</MenuItem>
                            {
                                BloodTypes.map((record,index)=>{
                                    return (
                                        <MenuItem key={index} value={record}>{record}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                    <TextField fullWidth id="dcandidate_phone" name="phone" variant="outlined" label="Phone" value={values.phone} onChange={handleInputChange} {...(errors.phone && {error:true,helperText:errors.phone})} />
                    <TextField fullWidth id="dcandidate_address" name="address" variant="outlined" label="Address" value={values.address} onChange={handleInputChange}/>
                    <TextField fullWidth id="dcandidate_age" name="age" variant="outlined" label="Age" value={values.age} onChange={handleInputChange}/>
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" type="submit" className={classes.button}>Submit</Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={resetForm}>Cancel</Button>
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item={true} xs={4}></Grid>
        </Grid>
    </form>
    );
}


const mapStateToProps = state => ({
    dCandidateData:state.dCandidate.data
});

const mapActionToProps = {
    createDCandidate:actions.create,
    updateDCandidate:actions.update,
    fetchDCandidate:actions.fetch
}
export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DCandidateForm));