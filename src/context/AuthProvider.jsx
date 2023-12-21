import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {
    GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged,
    signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from 'firebase/auth';

export const AuthContext = createContext(null);
const auth = getAuth(app);

// Mock function to determine the user's badge.
// Replace this with your actual logic.
// const getUserBadge = async (user) => {
//     if (user) {
//         // Example: All users get 'Bronze' badge by default
//         return 'Bronze';
//     }
//     return null;
// };

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [badge, setBadge] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    //         setUser(currentUser);
    //         setLoading(false);
    //         if (currentUser) {
    //             const userBadge = await getUserBadge(currentUser);
    //             setBadge(userBadge);
    //         } else {
    //             setBadge(null); // Clear badge when there is no user
    //         }
    //     });
    //     return () => {
    //         unsubscribe();
    //     }
    // }, []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const userUpdateProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => {
          return unSuscribe();
        };
      }, []);

    const authInfo = {
        user,
        createUser,
        logOut,
        signIn,
        signInWithGoogle,
        loading,
        userUpdateProfile,
        
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
