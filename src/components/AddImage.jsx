import { Avatar, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import useImageURL from "../utilis/useImageURL";

const img = "images/Dogs/profileDog.png";

export default function AddImage({ getImage = () => { }, style = {}, defaultImg = "" }) {

    const inputRef = useRef(null);
    const [src, setSrc] = useState(defaultImg === "" ? img : defaultImg);

    const handleImage = () => {
        inputRef.current.click();
    }

    const imageChange = (e) => {
        setSrc(e.target.files[0]);
        getImage(e.target.files[0])
    }

    return (
        <Box onClick={handleImage} sx={{ position: 'absolute', top: '-60px', left: '-90px', cursor: 'pointer', ...style }}>
            <Box sx={{ position: 'relative' }}>
                <Avatar
                    src={src != img && src!==defaultImg ? URL.createObjectURL(src) : src}
                    sx={{
                        width: '15vw',
                        height: '15vw',
                        border: '7px solid',
                        borderColor: 'primary.main',
                    }}>
                </Avatar>
                <input requierd={'true'} type="file" name="profileImage" onChange={imageChange} ref={inputRef} style={{ display: 'none' }}></input>

                <Avatar src=""
                    sx={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        bottom: '20px',
                        left: '6px'
                    }}> <AddAPhotoOutlinedIcon fontSize="large" sx={{ color: 'primary.main' }} /> </Avatar>
            </Box>

        </Box>
    )
}