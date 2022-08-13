import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDPktGwspIJkeKUeHc4s80xN1S2Mj_VfPo",
  authDomain: "olx-react-fa371.firebaseapp.com",
  projectId: "olx-react-fa371",
  storageBucket: "olx-react-fa371.appspot.com",
  messagingSenderId: "20532823622",
  appId: "1:20532823622:web:79a027317e74c04261ac47",
  measurementId: "G-KW2FVMQWMR"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
