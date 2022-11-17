import * as React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Checkbox, CircularProgress, Modal } from "@mui/material";
import { storage } from "./firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { uid } from "uid";
import LoadingButton from "@mui/lab/LoadingButton";
import Viewer from "react-viewer";
import { AiOutlineDelete } from "react-icons/ai";
import AlertMsg from "./component/AlertMsg";
import { toast } from "react-toastify";
import branchListString from "./constant/branchListString";
import typeList from "./constant/typeList";
import style from "./constant/style";

function App() {
  const [vinh, setVinh] = useState([]);
  const [hatinh, setHatinh] = useState([]);
  const [dongha, setDongha] = useState([]);
  const [hue, setHue] = useState([]);
  const [danang, setDanang] = useState([]);
  const [hoian, setHoian] = useState([]);
  const [tamky, setTamky] = useState([]);
  const [quangngai, setQuangngai] = useState([]);
  const [quynhon, setQuynhon] = useState([]);
  const [tuyhoa, setTuyhoa] = useState([]);
  const [nhatrang, setNhatrang] = useState([]);
  const [phanrang, setPhanrang] = useState([]);
  const [phanthiet, setPhanthiet] = useState([]);
  const [dalat, setDalat] = useState([]);
  const [ductrong, setDuctrong] = useState([]);
  const [dilinh, setDilinh] = useState([]);
  const [baoloc, setBaoloc] = useState([]);
  const [bienhoa, setBienhoa] = useState([]);
  const [trangbom, setTrangbom] = useState([]);
  const [longkhanh, setLongkhanh] = useState([]);
  const [longthanh, setLongthanh] = useState([]);
  const [baria, setBaria] = useState([]);
  const [vungtau, setVungtau] = useState([]);
  const [dian, setDian] = useState([]);
  const [thuanan, setThuanan] = useState([]);
  const [binhduong, setBinhduong] = useState([]);
  const [bencat, setBencat] = useState([]);
  const [binhphuoc, setBinhphuoc] = useState([]);
  const [hocmon, setHocmon] = useState([]);
  const [tayninh, setTayninh] = useState([]);
  const [trangbang, setTrangbang] = useState([]);
  const [longan, setLongan] = useState([]);
  const [benluc, setBenluc] = useState([]);
  const [mytho, setMytho] = useState([]);
  const [gocong, setGocong] = useState([]);
  const [cailay, setCailay] = useState([]);
  const [bentre, setBentre] = useState([]);
  const [travinh, setTravinh] = useState([]);
  const [vinhlong, setVinhlong] = useState([]);
  const [sadec, setSadec] = useState([]);
  const [caolanh, setCaolanh] = useState([]);
  const [hongngu, setHongngu] = useState([]);
  const [cantho, setCantho] = useState([]);
  const [thotnot, setThotnot] = useState([]);
  const [chaudoc, setChaudoc] = useState([]);
  const [chauphu, setChauphu] = useState([]);
  const [triton, setTriton] = useState([]);
  const [longxuyen, setLongxuyen] = useState([]);
  const [hatien, setHatien] = useState([]);
  const [rachgia, setRachgia] = useState([]);
  const [soctrang, setSoctrang] = useState([]);
  const [vinhchau, setVinhchau] = useState([]);
  const [nganam, setNganam] = useState([]);
  const [ngabay, setNgabay] = useState([]);
  const [vithanh, setVithanh] = useState([]);
  const [baclieu, setBaclieu] = useState([]);
  const [camau, setCamau] = useState([]);

  const branchList = [
    { name: "Tất cả" },
    { name: "Vinh", list: vinh },
    { name: "Hà Tĩnh", list: hatinh },
    { name: "Đông Hà", list: dongha },
    { name: "Huế", list: hue },
    { name: "Đà Nẵng", list: danang },
    { name: "Hội An", list: hoian },
    { name: "Tam Kỳ", list: tamky },
    { name: "Quảng Ngãi", list: quangngai },
    { name: "Quy Nhơn", list: quynhon },
    { name: "Tuy Hòa", list: tuyhoa },
    { name: "Nha Trang", list: nhatrang },
    { name: "Phan Rang", list: phanrang },
    { name: "Phan Thiết", list: phanthiet },
    { name: "Đà Lạt", list: dalat },
    { name: "Đức Trọng", list: ductrong },
    { name: "Di Linh", list: dilinh },
    { name: "Bảo Lộc", list: baoloc },
    { name: "Biên Hòa", list: bienhoa },
    { name: "Trảng Bom", list: trangbom },
    { name: "Long Khánh", list: longkhanh },
    { name: "Long Thành", list: longthanh },
    { name: "Bà Rịa", list: baria },
    { name: "Vũng Tàu", list: vungtau },
    { name: "Dĩ An", list: dian },
    { name: "Thuận An", list: thuanan },
    { name: "Bình Dương", list: binhduong },
    { name: "Bến Cát", list: bencat },
    { name: "Bình Phước", list: binhphuoc },
    { name: "Hóc Môn", list: hocmon },
    { name: "Tây Ninh", list: tayninh },
    { name: "Trảng Bàng", list: trangbang },
    { name: "Long An", list: longan },
    { name: "Bến Lức", list: benluc },
    { name: "Mỹ Tho", list: mytho },
    { name: "Gò Công", list: gocong },
    { name: "Cai Lậy", list: cailay },
    { name: "Bến Tre", list: bentre },
    { name: "Trà Vinh", list: travinh },
    { name: "Vĩnh Long", list: vinhlong },
    { name: "Sa Đéc", list: sadec },
    { name: "Cao Lãnh", list: caolanh },
    { name: "Hồng Ngự", list: hongngu },
    { name: "Cần Thơ", list: cantho },
    { name: "Thốt Nốt", list: thotnot },
    { name: "Châu Đốc", list: chaudoc },
    { name: "Châu Phú", list: chauphu },
    { name: "Tri Tôn", list: triton },
    { name: "Long Xuyên", list: longxuyen },
    { name: "Hà Tiên", list: hatien },
    { name: "Rạch Giá", list: rachgia },
    { name: "Sóc Trăng", list: soctrang },
    { name: "Vĩnh Châu", list: vinhchau },
    { name: "Ngã Năm", list: nganam },
    { name: "Ngã Bảy", list: ngabay },
    { name: "Vị Thanh", list: vithanh },
    { name: "Bạc Liêu", list: baclieu },
    { name: "Cà Mau", list: camau },
  ];

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
  const [visible, setVisible] = useState(false);
  const [defaultImg, setDefaultImg] = useState([]);
  const [imageSelected, setImageSelected] = useState("");
  const [typeAll, setTypeAll] = useState(false);
  const [isDeleteInAllBranch, setIsDeleteInAllBranch] = useState(false);
  const [open, setOpen] = useState(false);
  const [numberBranch, setNumberBranch] = useState("");
  const [numberBranchAction, setNumberBranchAction] = useState("");
  const [isfetch, setIsfetch] = useState(false);
  const [isfetchListAll, setIsfetchListAll] = useState(false);
  const [disabled, setDisabled] = useState(false);

  let quantity = 0;
  let allImagesNumber = 0;
  // console.log("numberBranchAction", numberBranchAction)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteImageInUrlPreview = () => {
    if (urlPreview.length === 1) {
      setUrlPreview([]);
      setIsFile(true);
    } else {
      console.log(defaultImg[0]);
      const numberFind = urlPreview.findIndex(
        (url) => url.src == defaultImg[0].src
      );
      // console.log("numberFind", numberFind)
      urlPreview.splice(numberFind, 1);
      images.splice(numberFind, 1);
      setImages([...images]);
      // console.log("newUrlPreview", urlPreview)
      setUrlPreview([...urlPreview]);
    }
  };

  const fetchOneTypeEachBranch = async (number) => {
    setTypeAll(true);
    setDisabled(true);
    const fetchOneType = async () => {
      let NewListUrl = [];
      // let a = 0;
      let quantityGet = 0;
      let totalImagesInEachBranch = 0;

      const listRef = ref(storage, `${branchList[number].name}/${type}`);
      await listAll(listRef)
        .then((res) => {
          if (res.items.length === 0) {
            setIsfetchListAll(true);
            setDisabled(false);
            switch (number) {
              case 1:
                setVinh([...NewListUrl]);
                break;
              case 2:
                setHatinh([...NewListUrl]);
                break;
              case 3:
                setDongha([...NewListUrl]);
                break;
              case 4:
                setHue([...NewListUrl]);
                break;
              case 5:
                setDanang([...NewListUrl]);
                break;
              case 6:
                setHoian([...NewListUrl]);
                break;
              case 7:
                setTamky([...NewListUrl]);
                break;
              case 8:
                setQuangngai([...NewListUrl]);
                break;
              case 9:
                setQuynhon([...NewListUrl]);
                break;
              case 10:
                setTuyhoa([...NewListUrl]);
                break;
              case 11:
                setNhatrang([...NewListUrl]);
                break;
              case 12:
                setPhanrang([...NewListUrl]);
                break;
              case 13:
                setPhanthiet([...NewListUrl]);
                break;
              case 14:
                setDalat([...NewListUrl]);
                break;
              case 15:
                setDuctrong([...NewListUrl]);
                break;
              case 16:
                setDilinh([...NewListUrl]);
                break;
              case 17:
                setBaoloc([...NewListUrl]);
                break;
              case 18:
                setBienhoa([...NewListUrl]);
                break;
              case 19:
                setTrangbom([...NewListUrl]);
                break;
              case 20:
                setLongkhanh([...NewListUrl]);
                break;
              case 21:
                setLongthanh([...NewListUrl]);
                break;
              case 22:
                setBaria([...NewListUrl]);
                break;
              case 23:
                setVungtau([...NewListUrl]);
                break;
              case 24:
                setDian([...NewListUrl]);
                break;
              case 25:
                setThuanan([...NewListUrl]);
                break;
              case 26:
                setBinhduong([...NewListUrl]);
                break;
              case 27:
                setBencat([...NewListUrl]);
                break;
              case 28:
                setBinhphuoc([...NewListUrl]);
                break;
              case 29:
                setHocmon([...NewListUrl]);
                break;
              case 30:
                setTayninh([...NewListUrl]);
                break;
              case 31:
                setTrangbang([...NewListUrl]);
                break;
              case 32:
                setLongan([...NewListUrl]);
                break;
              case 33:
                setBenluc([...NewListUrl]);
                break;
              case 34:
                setMytho([...NewListUrl]);
                break;
              case 35:
                setGocong([...NewListUrl]);
                break;
              case 36:
                setCailay([...NewListUrl]);
                break;
              case 37:
                setBentre([...NewListUrl]);
                break;
              case 38:
                setTravinh([...NewListUrl]);
                break;
              case 39:
                setVinhlong([...NewListUrl]);
                break;
              case 40:
                setSadec([...NewListUrl]);
                break;
              case 41:
                setCaolanh([...NewListUrl]);
                break;
              case 42:
                setHongngu([...NewListUrl]);
                break;
              case 43:
                setCantho([...NewListUrl]);
                break;
              case 44:
                setThotnot([...NewListUrl]);
                break;
              case 45:
                setChaudoc([...NewListUrl]);
                break;
              case 46:
                setChauphu([...NewListUrl]);
                break;
              case 47:
                setTriton([...NewListUrl]);
                break;
              case 48:
                setLongxuyen([...NewListUrl]);
                break;
              case 49:
                setHatien([...NewListUrl]);
                break;
              case 50:
                setRachgia([...NewListUrl]);
                break;
              case 51:
                setSoctrang([...NewListUrl]);
                break;
              case 52:
                setVinhchau([...NewListUrl]);
                break;
              case 53:
                setNganam([...NewListUrl]);
                break;
              case 54:
                setNgabay([...NewListUrl]);
                break;
              case 55:
                setVithanh([...NewListUrl]);
                break;
              case 56:
                setBaclieu([...NewListUrl]);
                break;
              case 57:
                setCamau([...NewListUrl]);
                break;

              default:
                break;
            }
          }
          totalImagesInEachBranch += res.items.length;
          res.items.map(async (itemRef) => {
            getDownloadURL(itemRef)
              .then((url) => {
                quantityGet += 1;
                NewListUrl.push({ src: url, itemRef });
                const condition = quantityGet === totalImagesInEachBranch;
                if (condition) {
                  setIsfetchListAll(true);
                  setDisabled(false);
                  // setNumberBranchAction("")
                  switch (number) {
                    case 1:
                      setVinh([...NewListUrl]);
                      break;
                    case 2:
                      setHatinh([...NewListUrl]);
                      break;
                    case 3:
                      setDongha([...NewListUrl]);
                      break;
                    case 4:
                      setHue([...NewListUrl]);
                      break;
                    case 5:
                      setDanang([...NewListUrl]);
                      break;
                    case 6:
                      setHoian([...NewListUrl]);
                      break;
                    case 7:
                      setTamky([...NewListUrl]);
                      break;
                    case 8:
                      setQuangngai([...NewListUrl]);
                      break;
                    case 9:
                      setQuynhon([...NewListUrl]);
                      break;
                    case 10:
                      setTuyhoa([...NewListUrl]);
                      break;
                    case 11:
                      setNhatrang([...NewListUrl]);
                      break;
                    case 12:
                      setPhanrang([...NewListUrl]);
                      break;
                    case 13:
                      setPhanthiet([...NewListUrl]);
                      break;
                    case 14:
                      setDalat([...NewListUrl]);
                      break;
                    case 15:
                      setDuctrong([...NewListUrl]);
                      break;
                    case 16:
                      setDilinh([...NewListUrl]);
                      break;
                    case 17:
                      setBaoloc([...NewListUrl]);
                      break;
                    case 18:
                      setBienhoa([...NewListUrl]);
                      break;
                    case 19:
                      setTrangbom([...NewListUrl]);
                      break;
                    case 20:
                      setLongkhanh([...NewListUrl]);
                      break;
                    case 21:
                      setLongthanh([...NewListUrl]);
                      break;
                    case 22:
                      setBaria([...NewListUrl]);
                      break;
                    case 23:
                      setVungtau([...NewListUrl]);
                      break;
                    case 24:
                      setDian([...NewListUrl]);
                      break;
                    case 25:
                      setThuanan([...NewListUrl]);
                      break;
                    case 26:
                      setBinhduong([...NewListUrl]);
                      break;
                    case 27:
                      setBencat([...NewListUrl]);
                      break;
                    case 28:
                      setBinhphuoc([...NewListUrl]);
                      break;
                    case 29:
                      setHocmon([...NewListUrl]);
                      break;
                    case 30:
                      setTayninh([...NewListUrl]);
                      break;
                    case 31:
                      setTrangbang([...NewListUrl]);
                      break;
                    case 32:
                      setLongan([...NewListUrl]);
                      break;
                    case 33:
                      setBenluc([...NewListUrl]);
                      break;
                    case 34:
                      setMytho([...NewListUrl]);
                      break;
                    case 35:
                      setGocong([...NewListUrl]);
                      break;
                    case 36:
                      setCailay([...NewListUrl]);
                      break;
                    case 37:
                      setBentre([...NewListUrl]);
                      break;
                    case 38:
                      setTravinh([...NewListUrl]);
                      break;
                    case 39:
                      setVinhlong([...NewListUrl]);
                      break;
                    case 40:
                      setSadec([...NewListUrl]);
                      break;
                    case 41:
                      setCaolanh([...NewListUrl]);
                      break;
                    case 42:
                      setHongngu([...NewListUrl]);
                      break;
                    case 43:
                      setCantho([...NewListUrl]);
                      break;
                    case 44:
                      setThotnot([...NewListUrl]);
                      break;
                    case 45:
                      setChaudoc([...NewListUrl]);
                      break;
                    case 46:
                      setChauphu([...NewListUrl]);
                      break;
                    case 47:
                      setTriton([...NewListUrl]);
                      break;
                    case 48:
                      setLongxuyen([...NewListUrl]);
                      break;
                    case 49:
                      setHatien([...NewListUrl]);
                      break;
                    case 50:
                      setRachgia([...NewListUrl]);
                      break;
                    case 51:
                      setSoctrang([...NewListUrl]);
                      break;
                    case 52:
                      setVinhchau([...NewListUrl]);
                      break;
                    case 53:
                      setNganam([...NewListUrl]);
                      break;
                    case 54:
                      setNgabay([...NewListUrl]);
                      break;
                    case 55:
                      setVithanh([...NewListUrl]);
                      break;
                    case 56:
                      setBaclieu([...NewListUrl]);
                      break;
                    case 57:
                      setCamau([...NewListUrl]);
                      break;

                    default:
                      break;
                  }
                }
              })
              .catch((error) => console.log(error));
          });
        })
        .catch((error) => {
          console.log(error.message, "error getting the images url");
        });
    };
    fetchOneType();
  };

  const fetAllListEachBranch = async (number) => {
    // const [isfetchListAll, setIsfetchListAll] = useState(false);
    setTypeAll(true);
    setDisabled(true);
    let totalImagesInEachBranch = 0;
    for (let i = 1; i < typeList.length; i++) {
      const listRef = ref(storage, `${branchList[number].name}/${typeList[i]}`);
      await listAll(listRef)
        .then((res) => {
          totalImagesInEachBranch += res.items.length;
        })
        .catch((error) => {
          console.log(error.message, "error getting the images url");
        });
    }

    const fetOneBranch = async () => {
      let NewListUrl = [];
      let a = 0;
      let quantityGet = 0;
      while (a < typeList.length - 1) {
        a++;
        const listRef = ref(
          storage,
          `${branchList[number].name}/${typeList[a]}`
        );
        await listAll(listRef)
          .then((res) => {
            res.items.map(async (itemRef) => {
              getDownloadURL(itemRef)
                .then((url) => {
                  quantityGet += 1;
                  NewListUrl.push({ src: url, itemRef });
                  const condition = quantityGet === totalImagesInEachBranch;
                  if (condition) {
                    setIsfetchListAll(true);
                    setDisabled(false);
                    //  setMultipleRender(!multipleRender)
                    switch (number) {
                      case 1:
                        setVinh([...NewListUrl]);
                        break;
                      case 2:
                        setHatinh([...NewListUrl]);
                        break;
                      case 3:
                        setDongha([...NewListUrl]);
                        break;
                      case 4:
                        setHue([...NewListUrl]);
                        break;
                      case 5:
                        setDanang([...NewListUrl]);
                        break;
                      case 6:
                        setHoian([...NewListUrl]);
                        break;
                      case 7:
                        setTamky([...NewListUrl]);
                        break;
                      case 8:
                        setQuangngai([...NewListUrl]);
                        break;
                      case 9:
                        setQuynhon([...NewListUrl]);
                        break;
                      case 10:
                        setTuyhoa([...NewListUrl]);
                        break;
                      case 11:
                        setNhatrang([...NewListUrl]);
                        break;
                      case 12:
                        setPhanrang([...NewListUrl]);
                        break;
                      case 13:
                        setPhanthiet([...NewListUrl]);
                        break;
                      case 14:
                        setDalat([...NewListUrl]);
                        break;
                      case 15:
                        setDuctrong([...NewListUrl]);
                        break;
                      case 16:
                        setDilinh([...NewListUrl]);
                        break;
                      case 17:
                        setBaoloc([...NewListUrl]);
                        break;
                      case 18:
                        setBienhoa([...NewListUrl]);
                        break;
                      case 19:
                        setTrangbom([...NewListUrl]);
                        break;
                      case 20:
                        setLongkhanh([...NewListUrl]);
                        break;
                      case 21:
                        setLongthanh([...NewListUrl]);
                        break;
                      case 22:
                        setBaria([...NewListUrl]);
                        break;
                      case 23:
                        setVungtau([...NewListUrl]);
                        break;
                      case 24:
                        setDian([...NewListUrl]);
                        break;
                      case 25:
                        setThuanan([...NewListUrl]);
                        break;
                      case 26:
                        setBinhduong([...NewListUrl]);
                        break;
                      case 27:
                        setBencat([...NewListUrl]);
                        break;
                      case 28:
                        setBinhphuoc([...NewListUrl]);
                        break;
                      case 29:
                        setHocmon([...NewListUrl]);
                        break;
                      case 30:
                        setTayninh([...NewListUrl]);
                        break;
                      case 31:
                        setTrangbang([...NewListUrl]);
                        break;
                      case 32:
                        setLongan([...NewListUrl]);
                        break;
                      case 33:
                        setBenluc([...NewListUrl]);
                        break;
                      case 34:
                        setMytho([...NewListUrl]);
                        break;
                      case 35:
                        setGocong([...NewListUrl]);
                        break;
                      case 36:
                        setCailay([...NewListUrl]);
                        break;
                      case 37:
                        setBentre([...NewListUrl]);
                        break;
                      case 38:
                        setTravinh([...NewListUrl]);
                        break;
                      case 39:
                        setVinhlong([...NewListUrl]);
                        break;
                      case 40:
                        setSadec([...NewListUrl]);
                        break;
                      case 41:
                        setCaolanh([...NewListUrl]);
                        break;
                      case 42:
                        setHongngu([...NewListUrl]);
                        break;
                      case 43:
                        setCantho([...NewListUrl]);
                        break;
                      case 44:
                        setThotnot([...NewListUrl]);
                        break;
                      case 45:
                        setChaudoc([...NewListUrl]);
                        break;
                      case 46:
                        setChauphu([...NewListUrl]);
                        break;
                      case 47:
                        setTriton([...NewListUrl]);
                        break;
                      case 48:
                        setLongxuyen([...NewListUrl]);
                        break;
                      case 49:
                        setHatien([...NewListUrl]);
                        break;
                      case 50:
                        setRachgia([...NewListUrl]);
                        break;
                      case 51:
                        setSoctrang([...NewListUrl]);
                        break;
                      case 52:
                        setVinhchau([...NewListUrl]);
                        break;
                      case 53:
                        setNganam([...NewListUrl]);
                        break;
                      case 54:
                        setNgabay([...NewListUrl]);
                        break;
                      case 55:
                        setVithanh([...NewListUrl]);
                        break;
                      case 56:
                        setBaclieu([...NewListUrl]);
                        break;
                      case 57:
                        setCamau([...NewListUrl]);
                        break;

                      default:
                        break;
                    }
                  }
                })
                .catch((error) => console.log(error));
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the images url");
          });
      }
    };
    fetOneBranch();
  };
  const fetchListAll = async () => {
    let NewListUrl = [];
    let total = 0;
    let quantityGet = 0;
    setDisabled(true);
    if (type === "Tất cả") {
      for (let i = 1; i < typeList.length; i++) {
        const listRef = ref(storage, `${branch}/${typeList[i]}`);
        await listAll(listRef)
          .then((res) => {
            total += res.items.length;
          })
          .catch((error) => {
            console.log(error.message, "error getting the images url");
          });
      }
    } else {
      const listRef = ref(storage, `${branch}/${type}`);
      await listAll(listRef)
        .then((res) => {
          total += res.items.length;
        })
        .catch((error) => {
          console.log(error.message, "error getting the images url");
        });
    }

    if (branch !== "Tất cả" && type === "Tất cả") {
      setTypeAll(true);
      if (total === 0) {
        setIsfetch(false);
        setDisabled(false);
      }
      for (let i = 1; i < typeList.length; i++) {
        const listRef = ref(storage, `${branch}/${typeList[i]}`);
        await listAll(listRef)
          .then(async (res) => {
            res.items.map(async (itemRef) => {
              await getDownloadURL(itemRef)
                .then((url) => {
                  quantityGet += 1;
                  NewListUrl.push({ src: url, itemRef });
                  setListUrl([...NewListUrl]);
                  const condition = quantityGet === total;
                  if (condition) {
                    setIsfetch(false);
                    setDisabled(false);
                  }
                })
                .catch((error) => console.log(error));
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the images url");
          });
      }
    }

    if (branch !== "Tất cả" && type !== "Tất cả") {
      setTypeAll(false);
      const listRef = ref(storage, `${branch}/${type && type}`);
      await listAll(listRef)
        .then(async (res) => {
          if (res.items.length === 0) {
            setIsfetch(false);
            setDisabled(false);
          }
          res.items.map(async (itemRef) => {
            await getDownloadURL(itemRef)
              .then((url) => {
                quantityGet += 1;
                NewListUrl.push({ src: url, itemRef });
                setListUrl([...NewListUrl]);
                const condition = quantityGet === total;
                if (condition) {
                  setIsfetch(false);
                  setDisabled(false);
                }
              })
              .catch((error) => console.log(error));
          });
        })
        .catch((error) => {
          console.log(error.message, "error getting the images url");
        });
    }
  };

  const uploadMultipleImages = () => {
    setDisabled(true);
    for (let i = 0; i <= images.length; i++) {
      if (i < images.length) {
        const imagesRef = ref(
          storage,
          `${branch}/${type}/${images[i]} + ${uid(10)}`
        );
        uploadBytes(imagesRef, images[i])
          .then(() => {
            quantity += 1;
            if (quantity === images.length) {
              toast.success("Upload image success");
              // console.log("ok con dê")
              setImages([]);
              setIsLoading(false);
              setIsFile(true);
              fetchListAll();
              setDisabled(false);
            }
          })
          .catch((error) => {
            toast.error("Upload image fail");
            console.log(error.message);
          });
      }
    }
  };

  useEffect(() => {
    if (branch !== "Tất cả" && type) {
      console.log("first");
      setListUrl([]);
      fetchListAll();
    }
    // console.log(branchList.length)
    if (branch === "Tất cả" && type === "Tất cả") {
      if (numberBranchAction > 0) {
        console.log("second");
        fetAllListEachBranch(numberBranchAction);
      } else {
        console.log("three");
        for (let i = 1; i < branchList.length; i++) {
          fetAllListEachBranch(i);
          // console.log("re render 2")
        }
      }
    } else if (branch === "Tất cả" && type !== "Tất cả") {
      if (numberBranchAction > 0) {
        fetchOneTypeEachBranch(numberBranchAction);
        console.log(numberBranchAction, "numberBranchAction");
        console.log("four");
      } else {
        for (let i = 1; i < branchList.length; i++) {
          fetchOneTypeEachBranch(i);
          console.log("re render Tất cả + type");
        }
      }
    }
  }, [branch, type, isDeleteInAllBranch, numberBranchAction]);

  const handleDelete = (itemRef) => {
    deleteObject(itemRef)
      .then(() => {
        if (branch === "Tất cả") {
          setIsDeleteInAllBranch(!isDeleteInAllBranch);
          setNumberBranchAction(numberBranch);
        }
        toast.success("Deleted success");
        if (listUrl.length === 1) {
          setListUrl([]);
        } else {
          fetchListAll();
        }
      })
      .catch((error) => {
        toast.error("Deleted fail");
        console.log(error);
      });
  };

  const handleMultipleDelete = () => {
    setImages([]);
    setListUrlDelete([]);
    setIsLoadingDelete(true);
    // console.log("handleMultipleDelete", listUrlDelete)

    for (let i = 0; i <= listUrlDelete.length; i++) {
      if (i < listUrlDelete.length) {
        deleteObject(listUrlDelete[i])
          .then(() => {
            quantity += 1;
            if (listUrl.length === listUrlDelete.length) {
              setListUrl([]);
              setImages([]);
              setListUrlDelete([]);
            }
            if (listUrl.length === 1) {
              setListUrl([]);
              setImages([]);
              setListUrlDelete([]);
            }
            if (quantity === listUrlDelete.length) {
              setListUrlDelete([]);
              setChecked(false);
              setIsLoadingDelete(false);
              fetchListAll();
              setImages([]);
              // console.log("images", images)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  // const handleChangeMultipleDeleted = (e, itemRef) => {
  //   if (listUrlDelete.length === 0) {
  //     listUrlDelete.push(itemRef)
  //     setListUrlDelete([...listUrlDelete])
  //     // console.log("listUrlDelete", listUrlDelete)
  //     // console.log("first")
  //   } else {
  //     // console.log("ok")
  //     let existImage = listUrlDelete.find((image) => image === itemRef);
  //     // console.log(existImage)
  //     if (existImage) {
  //       let indexImageExist = listUrlDelete.findIndex(
  //         (image) => image === itemRef
  //       );
  //       console.log(indexImageExist)
  //       listUrlDelete.splice(indexImageExist, 1);
  //       setListUrlDelete([...listUrlDelete])
  //       // console.log("second")
  //       // console.log("listUrlDelete", listUrlDelete)
  //     } else {
  //       listUrlDelete.push(itemRef)
  //       setListUrlDelete([...listUrlDelete])
  //       // console.log("listUrlDelete", listUrlDelete)
  //     }
  //   }
  // }

  const handleDeleteAllUrlPreview = () => {
    setUrlPreview([]);
    setListUrlDelete([]);
    setImages([]);
    setChecked(false);
    setIsFile(true);
  };

  const handleDeleteAll = () => {
    setImages([]);
    setListUrlDelete([]);
    setIsLoadingDelete(true);
    // console.log("handleMultipleDelete", listUrlDelete)

    for (let i = 0; i <= listUrlDelete.length; i++) {
      if (i < listUrlDelete.length) {
        deleteObject(listUrlDelete[i])
          .then(() => {
            quantity += 1;
            if (listUrl.length === listUrlDelete.length) {
              setListUrl([]);
              setImages([]);
              setListUrlDelete([]);
            }
            if (listUrl.length === 1) {
              setListUrl([]);
              setImages([]);
              setListUrlDelete([]);
            }
            if (quantity === listUrlDelete.length) {
              toast.success("Deleted All success");
              setListUrlDelete([]);
              setChecked(false);
              setIsLoadingDelete(false);
              fetchListAll();
              setImages([]);
              // console.log("images", images)
            }
          })
          .catch((error) => {
            toast.error("Deleted all fail");
            console.log(error);
          });
      }
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.files)
    // console.log(images)
    if (e.target.files.length > 0) {
      for (let i = 0; i <= e.target.files.length; i++) {
        if (i === e.target.files.length) {
          setIsFile(false);
          setImages([...images]);
          setUrlPreview([...urlPreview]);
          // console.log("b2")
        }
        if (i < e.target.files.length) {
          images.push(e.target.files[i]);
          urlPreview.push({ src: URL.createObjectURL(e.target.files[i]) });
        }
      }
    } else {
      setIsFile(true);
    }
  };

  const handleChangeCheckBox = (event) => {
    // console.log(event.target.checked)
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      let checkedAll = [];
      listUrl.map((url) => checkedAll.push(url.itemRef));
      setListUrlDelete([...checkedAll]);
    } else {
      setListUrlDelete([]);
    }
  };

  const handleCheckBoxUrlPreview = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      let checkedAllUrlPreview = [];
      urlPreview.map((url) => checkedAllUrlPreview.push(url.itemRef));
      setListUrlDelete([...checkedAllUrlPreview]);
    } else {
      setListUrlDelete([]);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setUrlPreview([]);
    uploadMultipleImages();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertMsg />
      {branch && type ? (
        ""
      ) : (
        <p style={{ color: "red", fontSize: "18px" }}>
          VUI LÒNG CHỌN BRANCH VÀ TYPE TRƯỚC KHI TẢI ẢNH LÊN
        </p>
      )}
      <div
        style={{
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Autocomplete
          disabled={disabled}
          value={branch}
          onChange={(event, newValue) => {
            setBranch(newValue);
            setType(newValue === "Tất cả" ? "Tất cả" : type);
            setListUrl([]);
            setNumberBranchAction("");
            setIsfetchListAll(false);
            setIsfetch(true);
            setChecked(false);
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
          disabled={disabled}
          value={type}
          onChange={(event, newValue) => {
            setType(newValue);
            setListUrl([]);
            setNumberBranchAction("");
            setIsfetch(true);
            setIsfetchListAll(false);
            setChecked(false);
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
      <div
        style={{
          width: "80vw",
          height: "700px",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
          padding: "20px",
          backgroundColor: "#EEEEEE",
        }}
      >
        {branch === "Tất cả" ? (
          <div>
            {branchList.map((branch, index) => {
              if (index > 0) {
                allImagesNumber += branch.list.length;
                return (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <p>
                        {" "}
                        {branch.name} ( {`Có ${branch.list.length} ảnh`} ){" "}
                      </p>
                    </div>
                    <div
                      style={{
                        width: "80vw",
                        height: branch.list.length > 0 ? "300px" : "300px",
                        overflow: "auto",
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "20px",
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      {/* {console.log("renderrrrrrr")} */}
                      {!isfetchListAll ? (
                        <Box
                          sx={{
                            width: "80vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress color="primary" thickness={6} />
                        </Box>
                      ) : branch.list.length > 0 ? (
                        branch.list.map((element) => {
                          return (
                            <div
                              style={{
                                width: "250px",
                                height: "250px",
                                overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <img
                                onClick={() => {
                                  setVisible(true);
                                  setDefaultImg([{ src: element.src }]);
                                  setImageSelected(element.itemRef);
                                  setNumberBranch(index);
                                }}
                                width="250px"
                                height="250px"
                                src={element.src}
                                alt="not found"
                              ></img>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          style={{
                            width: "80vw",
                            height: branch.list.length > 0 ? "300px" : "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <p>Chưa có ảnh nào</p>
                          </Box>
                        </div>
                      )}
                    </div>
                  </>
                );
              }
            })}
          </div>
        ) : urlPreview.length > 0 ? (
          urlPreview.map((element) => {
            return (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  onClick={() => {
                    setVisible(true);
                    setDefaultImg([{ src: element.src }]);
                  }}
                  width="250px"
                  height="250px"
                  src={element.src}
                  alt="not found"
                ></img>
              </div>
            );
          })
        ) : listUrl.length > 0 ? (
          listUrl.map((element) => {
            return (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  onClick={() => {
                    setVisible(true);
                    setDefaultImg([{ src: element.src }]);
                    setImageSelected(element.itemRef);
                  }}
                  width="250px"
                  height="250px"
                  src={element.src}
                  alt="not found"
                ></img>
              </div>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              top: "50%",
              left: "50%",
            }}
          >
            {branch && type ? (
              isfetch ? (
                <CircularProgress color="primary" thickness={6} />
              ) : (
                <p>Chưa có ảnh nào</p>
              )
            ) : (
              <p>Chưa có ảnh nào</p>
            )}
          </Box>
        )}
      </div>

      <Viewer
        customToolbar={(props) =>
          [...props]
            .slice(0, 2)
            .concat([...props].slice(3, 4))
            .concat([...props].slice(5, 9))
            .concat([
              {
                key: "delete",
                render: (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "28px",
                      position: "relative",
                      top: "3px",
                    }}
                  >
                    {" "}
                    <AiOutlineDelete
                      style={{ width: "18px", height: "18px" }}
                    />{" "}
                  </div>
                ),
                onClick: () => {
                  setVisible(false);
                  handleOpen();
                },
              },
            ])
        }
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={defaultImg}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            width="600px"
            height="600px"
            src={defaultImg.length > 0 ? defaultImg[0].src : ""}
            alt="not found"
          ></img>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outlined"
              style={{ marginRight: "30px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => {
                handleClose();
                urlPreview.length > 0
                  ? handleDeleteImageInUrlPreview()
                  : handleDelete(imageSelected);
              }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      <div
        style={{
          width: "80vw",
          textAlign: "end",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {typeAll ? (
          <div></div>
        ) : (
          <div style={{ display: "flex" }}>
            <Checkbox
              checked={checked}
              onChange={
                urlPreview.length > 0
                  ? handleCheckBoxUrlPreview
                  : handleChangeCheckBox
              }
              inputProps={{ "aria-label": "controlled" }}
            />
            <p>
              {urlPreview.length > 0
                ? "Xóa tất cả ảnh sắp tải lên"
                : "Chọn tất cả ảnh"}
            </p>
          </div>
        )}
        {typeAll ? (
          <div></div>
        ) : (
          <p>
            {urlPreview.length > 0
              ? `Có ${urlPreview.length} ảnh sẵn sàng tải lên`
              : ""}
          </p>
        )}
        {branch === "Tất cả" && type === "Tất cả" ? (
          <p>
            {allImagesNumber > 0
              ? `Tổng ${allImagesNumber} ảnh`
              : "Chưa có ảnh"}
          </p>
        ) : (
          <p>
            {listUrl.length > 0 ? `Tổng ${listUrl.length} ảnh` : "Chưa có ảnh"}
          </p>
        )}
      </div>
      {typeAll ? (
        ""
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="personal-image">
            <label className="label">
              <input
                type="file"
                multiple
                value={""}
                onChange={(e) => handleChange(e)}
                disabled={branch && type ? false : true}
              />
              <figure className="personal-figure">
                <img
                  src="https://unb.com.bd/public/default.jpg"
                  className="personal-avatar"
                  alt="avatar"
                />

                <figcaption className="personal-figcaption">
                  <img
                    src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                    alt="not found"
                  />
                </figcaption>
              </figure>
            </label>
          </div>
          {listUrlDelete.length === 0 ? (
            <LoadingButton
              style={{ width: "auto", height: "50px" }}
              onClick={handleSubmit}
              disabled={isFile}
              loading={isLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          ) : checked ? (
            <LoadingButton
              style={{ width: "auto", height: "50px" }}
              onClick={
                urlPreview.length > 0
                  ? handleDeleteAllUrlPreview
                  : handleDeleteAll
              }
              loading={isLoadingDelete}
              variant="contained"
            >
              Delete All
            </LoadingButton>
          ) : (
            <LoadingButton
              style={{ width: "auto", height: "50px" }}
              onClick={handleMultipleDelete}
              loading={isLoadingDelete}
              variant="contained"
            >
              Delete
            </LoadingButton>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
