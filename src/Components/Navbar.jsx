import React, { useEffect,useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { LogoutOutlined } from '@ant-design/icons';
import { readData } from '../Config/realtimeCalls';
import { readDataFirestore }from '../Config/firestoreCalls';


export default function Navbar() {
    const {logout,user}=useAuth();
    const [localUser,setLocalUser]=useState(null);
    useEffect(()=>{
        readUser();
    },[user]);

    const readUser = async () => {
        const luser = await readData('users', 'email', user.email);
        if (luser.val()) {
          console.log(luser.val()[Object.keys(luser.val())[0]]);
        }
        console.log('entered navbar')
      
        const luser2 = await readDataFirestore('users', 'email', user.email);

        if (!luser2.empty) {
          const userData = luser2.docs[0].data();
          console.log('Firestore User',userData);
          setLocalUser(userData);
        }
      };
    return (
        <div style={{textAlign:'right'}}>
            {localUser && <>{localUser.name}</>} <LogoutOutlined onClick={logout} />
        </div>
    );
}

