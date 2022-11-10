
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAJvbhCtA1Pe5c5-etjE8be_X9Fztuods",
  authDomain: "anh-khong-gian-diva.firebaseapp.com",
  projectId: "anh-khong-gian-diva",
  storageBucket: "anh-khong-gian-diva.appspot.com",
  messagingSenderId: "161885232156",
  appId: "1:161885232156:web:905882fd02a0c1608e13d9"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);