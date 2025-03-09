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
      if (!user || !user.email) return;
  
      try {
          const luser = await readData('users', 'email', user.email);
          if (luser.val()) {
              console.log(luser.val()[Object.keys(luser.val())[0]]);
          }
          
          const luser2 = await readDataFirestore('users', 'email', user.email);
  
          if (!luser2.empty) {
              const userData = luser2.docs[0].data();
              console.log('Firestore User', userData);
              
              if (!userData.permissions) {
                  console.warn('El usuario no tiene la propiedad permissions');
                  userData.permissions = {}; // Evita que sea undefined
              }
  
              setLocalUser(userData);
          } else {
              console.warn('No se encontró el usuario en Firestore');
          }
      } catch (error) {
          console.error('Error al leer datos del usuario:', error);
      }
  };
  
    return (
        <div style={{textAlign:'right'}}>
            {localUser && <>{localUser.name}</>} <LogoutOutlined onClick={logout} />
        </div>
    );
}

