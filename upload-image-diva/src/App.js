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
import { Button, Checkbox, CircularProgress, IconButton, Input, Modal, Typography } from '@mui/material';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 700,
  // height: 700,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}; 



function App() {

  const [vinh, setVinh] = useState([]);
  const [hatinh, setHatinh] = useState([]);
  const [dongha, setDongha] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);
  // const [listUrl, setListUrl] = useState([]);

  const typeList = ["Tất cả", "Mặt tiền", "Phòng khách", "Phòng thêu", "Phòng da"]
  const branchListString = [
    "Tất cả",
    "Vinh",
    "Hà Tĩnh",
    "Đông Hà"
  ]
  const branchList = [
    {name: "Tất cả"},
    {name: "Vinh", list: vinh},
    {name: "Hà Tĩnh", list: hatinh},
    {name: "Đông Hà", list: dongha},
    // "Huế",
    // "Đà Nẵng",
    // "Hội An",
    // "Tam Kỳ",
    // "Quảng Ngãi",
    // "Quy Nhơn",
    // "Tuy Hòa",
    // "Nha Trang",
    // "Phan Rang",
    // "Phan Thiết",
    // "Đà Lạt",
    // "Đức Trọng",
    // "Di Linh",
    // "Bảo Lộc",
    // "Biên Hòa",
    // "Trảng Bom",
    // "Long Khánh",
    // "Long Thành",
    // "Bà Rịa", 
    // "Vũng Tàu",
    // "Dĩ An",
    // "Thuận An",
    // "Bình Dương",
    // "Bến Cát",
    // "Bình Phước",
    // "Hóc Môn",
    // "Tây Ninh",
    // "Trảng Bàng",
    // "Long An",
    // "Bến Lức",
    // "Mỹ Tho",
    // "Gò Công",
    // "Cai Lậy",
    // "Bến Tre",
    // "Trà Vinh",
    // "Vĩnh Long",
    // "Sa Đéc",
    // "Cao Lãnh",
    // "Hồng Ngự",
    // "Cần Thơ",
    // "Thốt Nốt",
    // "Châu Đốc",
    // "Châu Phú",
    // "Tri Tôn",
    // "Long Xuyên",
    // "Hà Tiên",
    // "Rạch Giá",
    // "Sóc Trăng",
    // "Vĩnh Châu",
    // "Ngã Năm", 
    // "Ngã Bảy",
    // "Vị Thanh",
    // "Bạc Liêu",
    // "Cà Mau" 
  ]

  const [branch, setBranch] = useState("");
  const [inputBranch, setInputBranch] = useState("");
  const [type, setType] = useState("");
  const [inputType, setInputType] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isFile, setIsFile] = useState(true);
  const [urlPreview, setUrlPreview] = useState([]);
  const [listUrl, setListUrl] = useState([]);
  const [listUrlDelete, setListUrlDelete] = useState([]);
  const [checked, setChecked] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const [ defaultImg, setDefaultImg ] = useState([]);
  const [ imageSelected, setImageSelected ] = useState("");
  const [ typeAll, setTypeAll ] = useState(false);
  // const [ numberOld, setNumberOld ] = useState(0);
  const [ iAsynchronous, setIAsynchronous ] = useState(1);
  // console.log("listUrl", listUrl)
  const [open, setOpen] = useState(false);
  let NewListUrl = []
  let quantity = 0;
  let allImagesNumber = 0
  // let iAsynchronous = 1;
  let a = 0;
  let quantityGet = 0;
  let totalImagesInEachBranch = 0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetAllListEachBranch = async() => {
        setTypeAll(true)
        const fetOneBranch = async () => {
          a = 0;
          totalImagesInEachBranch = 0;
          quantityGet = 0;
          while (a < typeList.length - 1) {
            a++
            console.log(a, iAsynchronous)
            const listRef = ref(storage, `${branchList[iAsynchronous].name}/${typeList[a]}`);
            await listAll(listRef)
             .then((res) => {
              console.log("rểnder", res)
              totalImagesInEachBranch += res.items.length
               res.items.map(async(itemRef) => {
                  getDownloadURL(itemRef)
                  .then( (url) => {
                    quantityGet += 1
                    console.log("quantityGet", quantityGet)
                    console.log(totalImagesInEachBranch)
                    const condition = quantityGet === totalImagesInEachBranch
                    NewListUrl.push({"src": url, itemRef}); 
                    setListUrl([...NewListUrl]);
                    console.log(condition)
                    if (condition) {
                      setIAsynchronous(iAsynchronous + 1);
                      switch (branchList[iAsynchronous].name) {
                        case "Vinh" : 
                        setVinh([...NewListUrl])
                        break;
                        case "Hà Tĩnh" : 
                        setHatinh([...NewListUrl])
                        break;
                        case "Đông Hà" : 
                        setDongha([...NewListUrl])
                        break;
                      }
                    }
                    // console.log("iAsynchronous", iAsynchronous)
                  })
                  .catch((error) => console.log(error))
                  })
             })
             .catch((error) => {
               console.log(error.message, "error getting the images url");
             });

          // } 
           }
        }
        fetOneBranch()
           
    // }
  }
  const fetchListAll = async() => {

    if (branch !== "Tất cả" && type === "Tất cả") {
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

    }

    if (branch !== "Tất cả" && type !== "Tất cả") {
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
  }, [branch, type, iAsynchronous])

  useEffect(() => {
    if (branch === "Tất cả" && iAsynchronous < branchList.length) {
      fetAllListEachBranch()
      console.log("re render 2")
    }
  }, [branch, type, iAsynchronous])
  
  const handleDelete = (itemRef) => {
    deleteObject(itemRef).then(() => {
      if (branch === "Tất cả") {setIAsynchronous(1)}
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
      setUrlPreview([...urlPreview, {src: "https://gamek.mediacdn.vn/133514250583805952/2022/5/18/photo-1-16528608926331302726659.jpg"}])
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
          setType(newValue === "Tất cả" ? "Tất cả" : type)
          setListUrl([]);
          setChecked(false)
        }}
        inputValue={inputBranch}
        onInputChange={(event, newInputValue) => {
          setInputBranch(newInputValue);
        }}
        id="branch"
        options={branchListString}
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
        {
          branch === "Tất cả" && type === "Tất cả" ? (
            <div > 
              {branchList.map((branch, index) => {
                if (index > 0) {
                  allImagesNumber += branch.list.length
                  return (
                      <>
                        <p> {branch.name}  ( {`Có ${branch.list.length} ảnh`} ) </p>
                        <div style={{ width: "80vw", height: branch.list.length > 0 ? "300px" : "50px", overflow: "auto", display: "flex", flexWrap: "wrap", padding: "20px", backgroundColor: "#EEEEEE"}}> 
                        {branch.list.length > 0 ? (
                          branch.list.map((element) => {
                          return (
                            <div style={{ width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
                              <img onClick={() => { setVisible(true); setDefaultImg([{"src": element.src}]); setImageSelected(element.itemRef) } } width="250px" height="250px" src={element.src} alt="not found" ></img>              
                            </div>
                          )
                        }
                          )
                       ) : (
              <Box sx={{ display: 'flex', position: "relative", top: "50%", left: "50%" }}>
                <p>Chưa có ảnh nào</p>
              </Box>

               )}
            </div>
                      </>
                  )
               }
              })}
            </div>
          ) : (

          ///// xử lí cho hiển thị ảnh trước khi upload tại đây

          urlPreview.length > 0 ? (
            urlPreview.map((element) => {
              return (
                <div style={{ width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
                  <img width="250px" height="250px" src={element.src} alt="not found" ></img>              
                </div>
              )
              }
                  )
          ) : (

          
          listUrl.length > 0 ? (
          listUrl.map((element) => {
          return (
            <div style={{ width: "250px", height: "250px", overflow: "hidden", position: "relative"}}>
              <img onClick={() => { setVisible(true); setDefaultImg([{"src": element.src}]); setImageSelected(element.itemRef) } } width="250px" height="250px" src={element.src} alt="not found" ></img>              
            </div>
          )
          }
              )
          ) : (
          <Box sx={{ display: 'flex', position: "relative", top: "50%", left: "50%" }}>
            <p>Chưa có ảnh nào</p>
          </Box>

          )

          )

          )
        }
        
      </div>

      <Viewer
      customToolbar = {(props) => 
        [...props
      ].slice(0,2).concat([...props
      ].slice(3,4)).concat([...props
      ].slice(5,9))
      .concat([{ key: "delete", render: <div style={{width: "28px", height: "28px", borderRadius: "28px", position: "relative", top: "3px"}}> <AiOutlineDelete style={{width: "18px", height: "18px"}} /> </div> , onClick: () => { setVisible(false); handleOpen()} }])
      }
      visible={visible}
      onClose={() => { setVisible(false) } }
      images={defaultImg}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {console.log("defaultImg", defaultImg)}
          <img  width="600px" height="600px" src={defaultImg.length > 0 ? defaultImg[0].src : ""} alt="not found" ></img>
          <div style={{marginTop: "20px"}}>
            <Button variant='outlined' style={{marginRight: "30px"}} onClick={handleClose}>Cancel</Button>
            <Button variant='outlined' style={{backgroundColor: "red", color: "white"}} onClick={() => {handleDelete(imageSelected); handleClose()}}>Delete</Button>
          </div>
        </Box>
      </Modal>

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
        {
          branch === "Tất cả" && type === "Tất cả" ? (
            <p>{allImagesNumber > 0 ? ( `Tổng ${allImagesNumber} ảnh` ): ("Chưa có ảnh")}</p>
          ) : (
            <p>{ listUrl.length > 0 ? ( `Tổng ${listUrl.length} ảnh` ): ("Chưa có ảnh")}</p>
          ) 
        }
        
        
      </div>
      {typeAll ? "" :
      <div style={{ display: "flex", alignItems: "center"}}>
        <div className="personal-image">
          <label className="label">
              <input type="file" multiple value={""} onChange={(e) => handleChange(e)} disabled={branch && type ? false : true} />
                  <figure className="personal-figure">
                          
                          <img src="https://unb.com.bd/public/default.jpg" className="personal-avatar" alt="avatar" />
                          
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
      {branch && type ? "" : <p style={{color: "red", fontSize: "20px"}}>VUI LÒNG CHỌN BRANCH VÀ TYPE TRƯỚC KHI TẢI ẢNH LÊN</p>}
      
      
    </div>
  );
}

export default App;


