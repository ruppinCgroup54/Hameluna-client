import { Avatar, Box } from "@mui/material";
import img from "../assets/images/Dogs/profileDog.png"
import { useRef, useState } from "react";
import { position } from "stylis";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

export default function AddImage() {

    const inputRef = useRef(null);
    const [src, setSrc] = useState(img);

    const handleImage = () => {
        inputRef.current.click();
    }

    const imageChange = (e) => {
        setSrc(e.target.files[0]);
        sendImage(e);
    }

    return (
        <div onClick={handleImage} style={{ position: 'absolute', top: '-60px', right: '-90px' }}>
            <Box sx={{ position: 'relative' }}>
                <Avatar
                    src={src != img ? URL.createObjectURL(src) : src}
                    sx={{
                        width: '230px',
                        height: '230px',
                        border: '7px solid',
                        borderColor: 'primary.main',
                    }}>
                </Avatar>
                <input type="file" onChange={imageChange} ref={inputRef} style={{ display: 'none' }}></input>

                <Avatar src=""
                    sx={{
                        width:'50px',
                        height:'50px',
                        backgroundColor:'#fff',
                        position: 'absolute',
                        bottom:'20px',
                        left:'6px'
                    }}> <AddAPhotoOutlinedIcon fontSize="large" sx={{color:'primary.main'}} /> </Avatar>
            </Box>

        </div>
    )
}