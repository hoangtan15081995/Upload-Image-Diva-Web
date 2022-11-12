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
import AlertMsg from './component/AlertMsg';
import { toast } from "react-toastify";





function App() {

  const typeList = ["Tất cả", "Mặt tiền", "Phòng khách", "Phòng thêu", "Phòng da"]
  
  const branchList = [
    "Vinh",
    "Hà Tĩnh",
    "Đông Hà",
    "Huế",
    "Đà Nẵng",
    "Hội An",
    "Tam Kỳ",
    "Quảng Ngãi",
    "Quy Nhơn",
    "Tuy Hòa",
    "Nha Trang",
    "Phan Rang",
    "Phan Thiết",
    "Đà Lạt",
    "Đức Trọng",
    "Di Linh",
    "Bảo lộc",
    "Biên Hoà",
    "Trảng Bom",
    "Long Khánh",
    "Long Thành",
    "Bà Rịa",
    "Vũng Tàu",
    "Dĩ An",
    "Thuận An",
    "Bình Dương",
    "Bến Cát",
    "Bình Phước",
    "Hóc Môn",
    "Tây Ninh",
    "Trảng Bàng",
    "Long An",
    "Bến Lức",
    "Mỹ Tho",
    "Gò Công",
    "Cai Lậy",
    "Bến Tre",
    "Trà Vinh",
    "Vĩnh Long",
    "Sa Đéc",
    "Cao Lãnh",
    "Hồng Ngự",
    "Cần Thơ",
    "Thốt Nốt",
    "Châu Đốc",
    "Châu Phú",
    "Tri Tôn",
    "Long Xuyên",
    "Hà Tiên",
    "Rạch Giá",
    "Sóc Trăng",
    "Vĩnh Châu",
    "Ngã Năm",
    "Ngã Bảy",
    "Vị Thanh",
    "Bạc Liêu",
    "Cà Mau"
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
  const [ visible, setVisible ] = useState(false);
  const [ defaultImg, setDefaultImg ] = useState({});
  const [ imageSelected, setImageSelected ] = useState("");
  const [ typeAll, setTypeAll ] = useState(false);
  
  console.log("listUrl", listUrl)
  const NewListUrl = []
  let quantity = 0;
  const fetchListAll = async() => {
    if (type === "Tất cả") {
      setTypeAll(true)
      for (let i = 1; i < typeList.length; i++) {
        const listRef = ref(storage, `${branch}/${typeList[i]}`);
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

    } else {
       setTypeAll(false)
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
   
  }

  const uploadMultipleImages = () => {
    for ( let i = 0; i <= images.length; i ++) {
      if (i < images.length) {
        const imagesRef = ref(storage, `${branch}/${type}/${images[i]} + ${uid(10)}`);
        uploadBytes(imagesRef, images[i])
          .then(() => {
              quantity += 1
              if(quantity === images.length) {
                toast.success("Upload image success")
                console.log("ok con dê")
                setImages([])
                setIsLoading(false)
                setIsFile(true)
                fetchListAll()
              }
          })
          .catch((error) => {
            toast.error("Upload image fail")
            console.log(error.message);
         }); 
      }
    }
  }


  useEffect(() => {
    setListUrl([])
    fetchListAll()
    console.log("re render")
  }, [branch, type])


  
  const handleDelete = (itemRef) => {
    deleteObject(itemRef).then(() => {
      toast.success("Deleted success")
      if (listUrl.length === 1) {
        setListUrl([])
      } else {
        fetchListAll()
      }
    }).catch((error) => {
      toast.error("Deleted fail")
      console.log(error)
    });
  }

  const handleMultipleDelete = () => {
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
            toast.success("Deleted All success")
            setListUrlDelete([])
            setChecked(false)
            setIsLoadingDelete(false)
            fetchListAll()
            setImages([])
            console.log("images", images)
          }
        }).catch((error) => {
          toast.error("Deleted all fail")
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
          setImages([...images])
          console.log("b2")
        }
        if (i < e.target.files.length ) {
          images.push(e.target.files[i])
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

  const handleSubmit = () => {
    setIsLoading(true)
    uploadMultipleImages()
  };

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <AlertMsg />
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
      <div style={{ width: "80vw", height: "500px", overflow: "auto", display: "flex", flexWrap: "wrap", padding: "20px", backgroundColor: "#EEEEEE"}}>
        {listUrl.length > 0 ? (
          listUrl.map((element) => {
          return (
            <div style={{ width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
              <img onClick={() => { setVisible(true); setDefaultImg([{"src": element.src}]); setImageSelected(element.itemRef) } } width="250px" height="250px" src={element.src} alt="not found" ></img>

              {/* {listUrlDelete.find((imageRef) => imageRef === element.itemRef) ?
               (<CheckIcon style={{position: "absolute", top: "0", right: "0", zIndex: "100", color: "#00FF33", fontSize: "40px"}} />) :
               (
               <IconButton onClick={(e) => handleDelete(e, element.itemRef)} style={{position: "absolute", top: "0", right: "0", zIndex: "100", color: "white", fontSize: "18px"}}>
                <ClearIcon />
              </IconButton>
              )
              } */}
              
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
        [...props
      ].slice(0,2).concat([...props
      ].slice(3,4)).concat([...props
      ].slice(5,9))
      .concat([{ key: "delete", render: <div style={{width: "28px", height: "28px", borderRadius: "28px", position: "relative", top: "3px"}}> <AiOutlineDelete style={{width: "18px", height: "18px"}} /> </div> , onClick: () => {handleDelete(imageSelected); setVisible(false)} }])
    }
      visible={visible}
      onClose={() => { setVisible(false) } }
      images={defaultImg}
      />

      <div style={{ width: "80vw", textAlign: "end", display: "flex", justifyContent: "space-between"}}>
        {typeAll ? <div></div> : 
        <div style={{ display: "flex"}}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheckBox}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <p>Chọn tất cả ảnh</p>
        </div>
        }
        {typeAll ? <div></div> : 
          <p>{ images.length > 0 ? ( `Có ${images.length} ảnh sẵn sàng tải lên` ): ("")}</p>
        }
        <p>{ listUrl.length > 0 ? ( `Tổng ${listUrl.length} ảnh` ): ("Chưa có ảnh")}</p>
      </div>
      {typeAll ? "" :
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
      }
      
      
    </div>
  );
}

export default App;


