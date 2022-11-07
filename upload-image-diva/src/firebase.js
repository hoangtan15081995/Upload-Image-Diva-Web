
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDr4gKE-ffs4if7JHQBgEUhpxxZtwr7q-8",
  authDomain: "upload-image-diva-web.firebaseapp.com",
  projectId: "upload-image-diva-web",
  storageBucket: "upload-image-diva-web.appspot.com",
  messagingSenderId: "121811245987",
  appId: "1:121811245987:web:7a4da336a3cfd08fad9816"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);