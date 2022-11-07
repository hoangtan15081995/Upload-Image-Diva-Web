import * as React from 'react';
import {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, IconButton } from '@mui/material';
import { storage } from './firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import {uid} from "uid"



function App() {

  const typeList = [
    {label: "Mặt tiền", id: "1"},
    {label: "Phòng khách", id: "2"},
    {label: "Phòng thêu", id: "3"},
    {label: "Phòng da", id: "4"}
  ]
  
  const branchList = [
    {label: "Hồ Chí Minh", id: "1"},
    {label: "Hà Nội", id: "2"},
    {label: "Đà Nẵng", id: "3"},
    {label: "Cần Thơ", id: "4"},
  ]

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];
  const [branch, setBranch] = useState(branchList[0]);
  const [inputBranch, setInputBranch] = useState('');
  const [type, setType] = useState(typeList[0]);
  const [inputType, setInputType] = useState("");
  const [image, setImage] = useState(null);
  // const image = []
  // const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);

  const handleDelete = (e, item) => {
    // console.log(e)
    // console.log(item)
  }

  const handleChange = (e) => {
    if(e.target.files) {
      setImage(e.target.files[0])
      // for( let i = 0; i < e.target.files.length; i ++) {
      //   image.push(e.target.files[i])
      }
    }

  const handleSubmit = () => {
    const imageRef = ref(storage, `${branch.label}/${type.label}/${uid(10)}/${image}`);
    uploadBytes(imageRef, image)
      .then(() => {
        listAll(ref(storage, `${branch.label}/${type.label}`))
        .then((res) => {
          console.log("res", res)
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
      setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid black"}}>
      <Autocomplete
        disablePortal
        value={branch}
        onChange={(event, newValue) => {
          setBranch(newValue);
        }}
        inputValue={inputBranch}
        onInputChange={(event, newInputValue) => {
          setInputBranch(newInputValue);
        }}
        id="combo-box-demo"
        options={branchList}
        sx={{ width: 300, marginBottom: "20px" }}
        renderInput={(params) => <TextField {...params} label="Branch" />}
      />

      <Autocomplete
        disablePortal
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
        }}
        inputValue={inputType}
        onInputChange={(event, newInputValue) => {
          setInputType(newInputValue);
        }}
        id="combo-box-demo"
        options={typeList}
        sx={{ width: 300, marginBottom: "20px" }}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />

    <div style={{border: "1px solid black", width: "550px", height: "550px", overflow: "auto", display: "flex", flexWrap: "wrap"}}>

      {itemData.map((item, index) => (
        <>
        <div style={{border: "1px solid black", width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
          <img key={index} width="250px" height="250px" src={item.img} alt={item.title} ></img>
          <IconButton onClick={(e) => handleDelete(e, item)} style={{position: "absolute", top: "0", right: "0", zIndex: "100", color: "white", fontSize: "18px"}}>x</IconButton>
        </div>
        
      </>
      ))}
      
    </div>
      <input type="file" multiple onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;


