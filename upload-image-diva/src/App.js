import * as React from 'react';
import "./App.css";
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Checkbox, CircularProgress, IconButton, Input } from '@mui/material';
import { storage } from './firebase';
import { getDownloadURL, listAll, ref, uploadBytes, deleteObject } from 'firebase/storage';
import {uid} from "uid"
import LoadingButton from '@mui/lab/LoadingButton';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Viewer from 'react-viewer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AiOutlineDelete } from 'react-icons/ai';





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

  const [branch, setBranch] = useState("");
  const [inputBranch, setInputBranch] = useState("");
  const [type, setType] = useState("");
  const [inputType, setInputType] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isFile, setIsFile] = useState(true);
  const [urlPreview, setUrlPreview] = useState("");
  const [listUrl, setListUrl] = useState([]);
  const [listUrlDelete, setListUrlDelete] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedRestore, setCheckedRestore] = useState(false);
  const [restore, setRestore] = useState([]);
  const [ visible, setVisible ] = useState(false);
  const [ defaultImg, setDefaultImg ] = useState({});
  
  console.log("listUrl", listUrl)
  const NewListUrl = []
  let quantity = 0;
  // console.log(type)
  const fetchListAll = async() => {
    const listRef = ref(storage, `${branch}/${type && type}`);
    await listAll(listRef)
        .then(async(res) => {
              res.items.map(async(itemRef) => {
                await getDownloadURL(itemRef)
                 .then((url) => {NewListUrl.push({"src": url, itemRef}); setListUrl([...NewListUrl]) })
                 .catch((error) => console.log(error))
             })
             
        })
        .catch((error) => {
          console.log(error.message, "error getting the images url");
        });
  }

  const uploadMultipleImages = () => {
    for ( let i = 0; i <= images.length; i ++) {
      if (i < images.length) {
        const imagesRef = ref(storage, `${branch}/${type}/${images[i]} + ${uid(10)}`);
        uploadBytes(imagesRef, images[i])
          .then(() => {
              quantity += 1
              // console.log("quantity", quantity)
              if(quantity === images.length) {
                console.log("ok con dê")
                setImages([])
                setIsLoading(false)
                setIsFile(true)
                fetchListAll()
              }
          })
          .catch((error) => {
            console.log(error.message);
         }); 
      }
    }
  }

  const restoreImages = (listRestore) => {
    for ( let i = 0; i <= listRestore.length; i ++) {
      if (i < listRestore.length) {
        const imagesRef = ref(storage, `${branch}/${type}/${images[i]} + ${uid(10)}`);
        uploadBytes(imagesRef, images[i])
          .then(() => {
              quantity += 1
              // console.log("quantity", quantity)
              if(quantity === images.length) {
                console.log("ok con dê")
                setImages([])
                setIsLoading(false)
                setIsFile(true)
                fetchListAll()
              }
          })
          .catch((error) => {
            console.log(error.message);
         }); 
      }
    }
  }

  useEffect(() => {
    setListUrl([])
    fetchListAll()
  
  }, [branch, type])


  
  const handleDelete = (e, itemRef) => {
    // setRestore([itemRef])
    // console.log("itemRef", itemRef)
    deleteObject(itemRef).then(() => {
      if (listUrl.length === 1) {
        setListUrl([])
      } else {
        fetchListAll()
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleMultipleDelete = () => {
    setRestore([...listUrlDelete])
    setImages([])
    setListUrlDelete([])
    setIsLoadingDelete(true)
    console.log("handleMultipleDelete", listUrlDelete)

    for ( let i = 0; i <= listUrlDelete.length; i ++) {
      if (i < listUrlDelete.length) {
        deleteObject(listUrlDelete[i]).then(() => {
          quantity += 1
          if (listUrl.length === listUrlDelete.length ) {
            setListUrl([])
            setImages([])
            setListUrlDelete([])
          }
          if (listUrl.length === 1) {
            setListUrl([])
            setImages([])
            setListUrlDelete([])
          }
          if (quantity === listUrlDelete.length) {
            setListUrlDelete([])
            setChecked(false)
            setIsLoadingDelete(false)
            fetchListAll()
            setImages([])
            console.log("images", images)
          }
        }).catch((error) => {
          console.log(error)
        });
      }
    }
  }

  const handleChangeMultipleDeleted = (e, itemRef) => {
    if (listUrlDelete.length === 0) {
      listUrlDelete.push(itemRef)
      setListUrlDelete([...listUrlDelete])
      console.log("listUrlDelete", listUrlDelete)
      console.log("first")
    } else {
      console.log("ok")
      let existImage = listUrlDelete.find((image) => image === itemRef);
      console.log(existImage)
      if (existImage) {
        let indexImageExist = listUrlDelete.findIndex(
          (image) => image === itemRef
        );
        console.log(indexImageExist)
        listUrlDelete.splice(indexImageExist, 1);
        setListUrlDelete([...listUrlDelete])
        console.log("second")
        console.log("listUrlDelete", listUrlDelete)
      } else {
        listUrlDelete.push(itemRef)
        setListUrlDelete([...listUrlDelete])
        console.log("listUrlDelete", listUrlDelete)
      }
    }
  }

  const handleDeleteAll = () => {

    // setRestore([...listUrlDelete])
    setImages([])
    setListUrlDelete([])
    setIsLoadingDelete(true)
    console.log("handleMultipleDelete", listUrlDelete)

    for ( let i = 0; i <= listUrlDelete.length; i ++) {
      if (i < listUrlDelete.length) {
        deleteObject(listUrlDelete[i]).then(() => {
          quantity += 1
          if (listUrl.length === listUrlDelete.length ) {
            setListUrl([])
            setImages([])
            setListUrlDelete([])
          }
          if (listUrl.length === 1) {
            setListUrl([])
            setImages([])
            setListUrlDelete([])
          }
          if (quantity === listUrlDelete.length) {
            setListUrlDelete([])
            setChecked(false)
            setIsLoadingDelete(false)
            fetchListAll()
            setImages([])
            console.log("images", images)
          }
        }).catch((error) => {
          console.log(error)
        });
      }
    }
  }

  const handleChange = (e) => {
    console.log(e.target.files)
    console.log(images)
    if(e.target.files.length > 0) {
      for( let i = 0; i <= e.target.files.length; i ++) {
        if (i === e.target.files.length ) {
          setIsFile(false)
          console.log("b2")
        }
        if (i < e.target.files.length ) {
          images.push(e.target.files[i])
          console.log(images)
          console.log("b1")
        } 
        }
      } else {
        setIsFile(true)
      }
    }

    const handleChangeCheckBox = (event) => {
      console.log(event.target.checked)
      setChecked(event.target.checked);
      if(event.target.checked === true) {
        let checkedAll = []
        listUrl.map((url) => checkedAll.push(url.itemRef) )
        setListUrlDelete([...checkedAll])
      } else {
        setListUrlDelete([])
      }
    };

    // const handleChangeCheckBoxRestore = (event) => {
    //   console.log(event.target.checked)
    //   setCheckedRestore(event.target.checked);
    //   if(event.target.checked === true) {
    //     const ref = storage[0]
    //     getDownloadURL(ref)
    //              .then((url) => {NewListUrl.push({url, ref }); setListUrl([...NewListUrl]) })
    //              .catch((error) => console.log(error))
    //     console.log("listurllllll" , listUrl)
    //   }
    // };

  const handleSubmit = () => {
    setIsLoading(true)
    uploadMultipleImages()
  };

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <div style={{height: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Autocomplete
        disablePortal
        value={branch}
        onChange={(event, newValue) => {
          setBranch(newValue);
          setListUrl([]);
          setChecked(false)
        }}
        inputValue={inputBranch}
        onInputChange={(event, newInputValue) => {
          setInputBranch(newInputValue);
        }}
        id="branch"
        options={branchList}
        sx={{ width: 300, margin: "20px" }}
        renderInput={(params) => <TextField {...params} label="Branch" />}
      />
      <Autocomplete
        disablePortal
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
          setListUrl([]);
          setChecked(false)
        }}
        inputValue={inputType}
        onInputChange={(event, newInputValue) => {
          setInputType(newInputValue);
        }}
        id="type"
        options={typeList}
        sx={{ width: 300, margin: "20px" }}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      </div>
      {console.log("defaultImg", defaultImg)}
      <div style={{ width: "80vw", height: "500px", overflow: "auto", display: "flex", flexWrap: "wrap", padding: "20px", backgroundColor: "#EEEEEE"}}>
        {listUrl.length > 0 ? (
          listUrl.map((element) => {
          return (
            <div style={{ width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
              <img onClick={() => { setVisible(true); setDefaultImg([{"src": element.src}]) } } width="250px" height="250px" src={element.src} alt="not found" ></img>

              {listUrlDelete.find((imageRef) => imageRef === element.itemRef) ?
               (<CheckIcon style={{position: "absolute", top: "0", right: "0", zIndex: "100", color: "#00FF33", fontSize: "40px"}} />) :
               (
               <IconButton onClick={(e) => handleDelete(e, element.itemRef)} style={{position: "absolute", top: "0", right: "0", zIndex: "100", color: "white", fontSize: "18px"}}>
                <ClearIcon />
              </IconButton>
              )
              }
              
            </div>
          )
          }
         )
        ) : (
          <Box sx={{ display: 'flex', position: "relative", top: "50%", left: "50%" }}>
            {/* <CircularProgress /> */}
            <p>Chưa có ảnh nào</p>
          </Box>

        )
        }  
      </div>

      <Viewer
      customToolbar = {(props) => 
        [...props, 
          {key: "zoomIn", actionType: 1, onClick: () => {console.log("xóa")}} , 
          { key: "delete", render: <div style={{width: "28px", height: "28px", borderRadius: "28px", position: "relative", top: "3px"}}> <AiOutlineDelete style={{width: "18px", height: "18px"}} /> </div> , onClick: () => {console.log("xóa")} }]}
      visible={visible}
      onClose={() => { setVisible(false); } }
      images={defaultImg}
      />

      <div style={{ width: "80vw", textAlign: "end", display: "flex", justifyContent: "space-between"}}>
        <div style={{ display: "flex"}}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheckBox}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <p>Chọn tất cả ảnh</p>
        </div>
        {/* <div style={{ display: "flex"}}>
        <Checkbox
          checked={checkedRestore}
          onChange={handleChangeCheckBoxRestore}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <p>Khôi phục ảnh vừa xóa</p>
        </div> */}
        <p>{ listUrlDelete.length > 0 ? ( `Đã chọn ${listUrlDelete.length} ảnh` ): ("")}</p>
        <p>{ listUrl.length > 0 ? ( `Tổng ${listUrl.length} ảnh` ): ("Chưa có ảnh")}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center"}}>
        <div className="personal-image">
          <label className="label">
              <input type="file" multiple value={""} onChange={(e) => handleChange(e)} disabled={branch && type ? false : true} />
                  <figure className="personal-figure">
                          {urlPreview ? <img src={urlPreview} className="personal-avatar" alt="avatar" /> : 
                          <img src="https://unb.com.bd/public/default.jpg" className="personal-avatar" alt="avatar" />
                          } 
                        <figcaption className="personal-figcaption">
                            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                        </figcaption>
                  </figure>
            </label>
        </div>
        {listUrlDelete.length === 0 ? 
        (<LoadingButton style={{ width: "auto", height: "50px"}} onClick={handleSubmit} disabled={isFile} loading={isLoading}  variant="contained">
            Submit
         </LoadingButton>
        ) : 
        checked ? (
          <LoadingButton style={{ width: "auto", height: "50px"}} onClick={handleDeleteAll} loading={isLoadingDelete} variant="contained">
           Delete All
          </LoadingButton>
        ) :
        (<LoadingButton style={{ width: "auto", height: "50px"}} onClick={handleMultipleDelete} loading={isLoadingDelete} variant="contained">
           Delete
          </LoadingButton>)
        }
        </div>
      
      
    </div>
  );
}

export default App;


