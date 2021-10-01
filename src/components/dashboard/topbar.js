import  React, { useEffect, useState }  from "react";
import { Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeBaseProvider, Avatar, Actionsheet, useDisclose} from "native-base";
import { signOut } from "../../services/authServices";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {DrawerContentScrollView, DrawerItemList, DrawerItem,} from '@react-navigation/drawer';
import { getUserDetails, updateUserProfile } from "../../services/profileService";


const Topbar = ({handleView}, {navigation}, props) => {

    const { isOpen, onOpen, onClose } = useDisclose();
    const [viewType, setViewType] = useState(true);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [transferred, setTransferred] = useState(0);

    const chooseFile = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 1200,
            cropping: true,
          }).then((image) => {
            console.log("Selected Image : ",image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
          })
    };


    /**
     * uploading image to firebase to firebase storage.
     * @returns image url
     */
    const uploadImage = async () => {
        if( image == null ) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`${filename}`); //photos/${filename}
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,);

            setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,);
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();
            
            console.log("Firebase Image Url : ", url)
            updateUserProfile(url);

            setUploading(false);
            setImage(null);

            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };

    const profileDetails  = async () => {
        const {email, uid, photoURL, displayName} = await getUserDetails();

        let temp = {
            email:email,
            photoURL:photoURL,
            uid:uid,
            displayName:displayName
        };
        setUserDetails(temp)
    }

    useEffect(() => {
        profileDetails()
        console.log("updating")
    }, [])

    return(
        <View style={[{height:50, padding:2, marginHorizontal:10, marginTop:10 ,borderRadius:10, borderWidth:0.5, borderColor:'#d4d4d4' ,justifyContent:'space-between', alignItems:'center', backgroundColor:'#ffff',}, {flexDirection: "row",}]}>
            <View style={{ justifyContent:'center', alignItems:'center', padding:8,}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icons name="menu" size={25} color='#525252' />
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity>
                    <Text>Search your notes</Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', padding:6 ,}}>
                <TouchableOpacity onPress={() => {setViewType(!viewType); handleView(viewType)}}>
                    {!viewType ? <Icons name="view-agenda-outline" size={25} color='#525252' /> :
                    <Icons name="view-grid-outline" size={25} color='#525252' />}
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center', alignItems:'flex-end', padding:6}}>
                <TouchableOpacity onPress={onOpen}>
                    <NativeBaseProvider>
                        <Avatar bg="indigo.500" size="sm" 
                            source={{ uri: image ? image : userDetails.photoURL, }}>
                            FN
                        </Avatar>

                {/* Bottom Sheet Starts Here */}

                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                <Actionsheet.Item onPress={() => chooseFile()} >
                                    <View style={{flexDirection:'row', alignItems:'center', }}>
                                        <Avatar size="lg" 
                                            source={{ uri: image ? image : userDetails.photoURL, }}>
                                            FN
                                        </Avatar>
                                        <View style={{marginHorizontal:10}}>
                                            <Text style={{fontWeight:'600'}}>{userDetails.displayName}</Text>
                                            <Text>{userDetails.email}</Text>
                                        </View>
                                    </View>
                                </Actionsheet.Item>
                                <Actionsheet.Item onPress={uploadImage}>
                                    <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row',}}>
                                        <Text style={{fontWeight:'600', fontSize:15, marginRight:'75%'}}>Upload</Text>
                                        {uploading ?<ActivityIndicator size="small" color="#eab308" />:null}
                                    </View>
                                    
                                </Actionsheet.Item>
                                <Actionsheet.Item onPress={() => signOut()}>Signout</Actionsheet.Item>
                            </Actionsheet.Content>
                        </Actionsheet>

                        {/* Bottom Sheet Ends Here */}

                    </NativeBaseProvider>
                </TouchableOpacity>

                {/* Drawer Starts From Here */}

                <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            <DrawerItem
                                label="Close drawer"
                                onPress={() => props.navigation.closeDrawer()}
                            />
                            <DrawerItem
                                label="Toggle drawer"
                                onPress={() => props.navigation.toggleDrawer()}
                            />
                </DrawerContentScrollView>
            </View>
        </View>
    )
}

export default Topbar;