import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


/**
 * updatinf profile image to the current user profile.
 * @param {url} ImageUrl 
 * @returns 
 */
export const updateUserProfile = async (ImageUrl) => {
  return await auth()
    .currentUser.updateProfile({
      photoURL: ImageUrl,
    })
    .then();
};

export const getUserDetails = async () => {
  return auth().currentUser;
};
