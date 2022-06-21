import React,{useState,useEffect} from "react"

//  useForm
//  Form helper, creates handlers for inpout change, form submission, field validation, and errors
const useForm = (initFieldValues,props,addToast) => {
    let validationPatterns={}//{key:{required:boolean,pattern: regex string}}
    const setValidationPatterns= p=>{//setter function
        validationPatterns={...p}
    }
    const [values,setValues]= useState(initFieldValues)
    const inputLabel = React.createRef();//reference for the Select object Label
    const [labelWidth,setLabelWidth]= React.useState(0);//Label with and setter
    React.useEffect(()=>{setLabelWidth(inputLabel.current.offsetWidth)})//init label width
    
    //  Handles changes to for input, updates values and calls the validation function on that field
    const handleInputChange = e =>{
        const {name,value}= e.target
        
        setValues({
            ...values,
            [name]:value
        })
        if(validationPatterns[name])
            validateForm({...{[name]:validationPatterns[name]}})
    }

    //  handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault()
        
        if(validateForm())//validate form
        {
            //  Success function
            //  Helper function to resets form and creates a toast message
            //  params[in] msg string message for the Toast
            const onSuccess = (msg) => {
                resetForm()  //reset form to default values
                addToast(msg,{apperance:'success'}) // create a toast message
            }
            
            if(props.currentId == 0 || props.currentId == null) // new record
                props.createDCandidate(values,()=>{onSuccess("Record Inserted!")})
            else //update existing
                props.updateDCandidate(props.currentId,values,()=>{onSuccess("Record Updated!")})
        }
    }
    //error object and setter
    const [errors,setErrors] = useState({})

    //  resetForm function
    //  resets all fields in the form to initial values.  Resets error object to an empty object
    const resetForm = () =>{
        console.log("Reseting Form")
        setValues({...initFieldValues});
        setErrors({})
        props.setCurrentId(0)
    }
    const validateForm = (fieldValidation=validationPatterns) =>{//{key:{required: boolean,pattern:...},...}
        let temp={}
        
        Object.keys(fieldValidation).map((key,i)=>{//just check for a value
            if(fieldValidation[key].required && !values[key]) // validate field is required and not empty
            {
                temp[key]=values[key]?"":"This field is required."
            }
            if(values[key] && fieldValidation[key].pattern) // validadate field value passes the regex pattern check
            {
                const regEx=RegExp(fieldValidation[key].pattern,"g")
                temp[key] = regEx.test(values[key])?"":"Invalid value"
            }
            
        })
        //set any errors to the errors object
        setErrors({
            ...temp
        })
        if(fieldValidation==validationPatterns)//if form submission, return true if no validation errors
            return Object.values(temp).every(x=> x == "")
    }
    //return all the form helpers
    return {
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
    };
}

export default useForm;