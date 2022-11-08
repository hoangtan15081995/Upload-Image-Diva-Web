import * as React from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { storage } from './firebase';
import { getDownloadURL, listAll, ref, uploadBytes, deleteObject } from 'firebase/storage';
import {uid} from "uid"




function App() {

  const typeList = ["Mặt tiền", "Phòng khách", "Phòng thêu", "Phòng da"]
  
  const branchList = [
    "Bà Rịa",
    "Bạc Liêu",
    "Bảo Lộc",
    "Bến Cát",
    "Bến Lức",
    "Bến Tre",
    "Biên Hòa",
    "Bình Dương",
    "Bình Phước",
    "Cà Mau",
    "Cai Lậy",
    "Cần Thơ",
    "Cao Lãnh",
    "Châu Đốc",
    "Châu Phú",
    "Đà Lạt",
    "Đà Nẵng",
    "Di Linh",
    "Dĩ An",
    "Đông Hà",
    "Đức Trọng",
    "Gò Công",
    "Hà Tiên",
    "Hà Tĩnh",
    "Hóc Môn",
    "Hội An",
    "Hồng Ngự",
    "Huế",
    "Long An",
    "Long Khánh",
    "Long Thành",
    "Long Xuyên",
    "Mỹ Tho",
    "Ngã Bảy",
    "Ngã Năm",
    "Nha Trang",
    "Phan Rang",
    "Phan Thiết",
    "Quảng Ngãi",
    "Quy Nhơn",
    "Rạch Giá",
    "Sa Đéc",
    "Sóc Trăng",
    "Tam Kỳ",
    "Tây Ninh",
    "Thốt Nốt",
    "Thuận An",
    "Trà Vinh",
    "Trảng Bàng",
    "Trảng Bom",
    "Tri Tôn",
    "Tuy Hòa",
    "Vinh",
    "Vị Thanh",
    "Vĩnh Châu",
    "Vĩnh Long",
    "Vũng Tàu"
  ]

  const [branch, setBranch] = useState(branchList[0]);
  const [inputBranch, setInputBranch] = useState("");
  const [type, setType] = useState("");
  const [inputType, setInputType] = useState("");
  const [image, setImage] = useState(null);
  const [listUrl, setListUrl] = useState([]);
  const test = []

  // console.log(type)
  const fetchListAll = async() => {
    const listRef = ref(storage, `${branch}/${type && type}`);
    await listAll(listRef)
        .then(async(res) => {
              console.log("bbbbb")
              res.items.map(async(itemRef) => {
                await getDownloadURL(itemRef)
                 .then((url) => {console.log("vvvvv"); test.push(url); console.log("kkkk"); setListUrl([...test]) })
                 .catch((error) => console.log(error))
             })
             
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
  }

  const deletedImage = () => {
    const desertRef = ref(storage, 'images/desert.jpg');
  }

  useEffect(() => {
    setListUrl([])
    fetchListAll()
  
  }, [branch, type])


  
  const handleDelete = (e, url) => {
    console.log(e)
    console.log(url)
    const fileRef = storage.refFromURL(url);
    fileRef.delete().then(() => {
      console.log("deleted ok")
    }).catch((error) => console.log(error))
  }

  const handleChange = (e) => {
    if(e.target.files) {
      setImage(e.target.files[0])
      // for( let i = 0; i < e.target.files.length; i ++) {
      //   image.push(e.target.files[i])
      }
    }

  const handleSubmit = () => {
    const imageRef = ref(storage, `${branch}/${type}/${image} + ${uid(10)}`);
    uploadBytes(imageRef, image)
      .then(() => {
        fetchListAll()
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid black"}}>
      <Autocomplete
        // disablePortal
        value={branch}
        onChange={(event, newValue) => {
          setBranch(newValue);
        }}
        inputValue={inputBranch}
        onInputChange={(event, newInputValue) => {
          setInputBranch(newInputValue);
        }}
        id="branch"
        options={branchList}
        sx={{ width: 300, marginBottom: "20px" }}
        renderInput={(params) => <TextField {...params} label="Branch" />}
      />

      <Autocomplete
        // disablePortal
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
        }}
        inputValue={inputType}
        onInputChange={(event, newInputValue) => {
          setInputType(newInputValue);
        }}
        id="type"
        options={typeList}
        sx={{ width: 300, marginBottom: "20px" }}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
    {console.log("listUrl")}
    <div style={{border: "1px solid black", width: "550px", height: "550px", overflow: "auto", display: "flex", flexWrap: "wrap"}}>
        {listUrl.length > 0 ? (
          listUrl.map((url) => {
          return (
            <div style={{border: "1px solid black", width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
              <img width="250px" height="250px" src={url} alt="not found" ></img>
              <IconButton onClick={(e) => handleDelete(e, url)} style={{position: "absolute", top: "0", right: "0", zIndex: "100", color: "white", fontSize: "18px"}}>x</IconButton>
            </div>
          )
          }
         )
        ) : (
          <Box sx={{ display: 'flex', position: "relative", top: "50%", left: "50%" }}>
            <CircularProgress />
          </Box>

        )
        }

      
    </div>
      <input type="file" onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;


