import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";

const Register = () => {

    const [email, setEmail] = useState(" ");
    const [error, setError] = useState({
        error: false,
        message:"",
    });

    const validateEmail = (email) => {
        const expreg = /^[A-Z09._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expreg.test(email);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateEmail(email)){
            setError({
                erro: false,
                message: "",
            });
            console.log("Email correct")
        }else{
            setError({
                error: true,
                message: "Formadto de email incorrecto"
            })
        }
       
    }


    return (
        <div>
            <h1>Registrate</h1>
            <Box
            component="form"
            onSubmit={handleSubmit}
            >
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    required
                    variant="outlined"
                    fullWidth
                    error = {error.error}
                    helperText = {error.message}
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />

            <Button
                type="submit"
                variant="outlined"
                sx={{ mt:2 }}
            >
                Registrarme
            </Button>    
            </Box>
        </div>
    )
}

export default Register
