import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, updateProfileImage } from "../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import UserEdit from "../../components/UserEdit";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { toast } from 'react-toastify'




function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, message } = useSelector((state) => state.auth)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const editProfile = (user) => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const updateThisUser = (updatedUser) => {
        console.log('Updated user:', updatedUser);
        dispatch(updateUser(updatedUser)).then(() => {
            handleCloseModal();
        });

    }



    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (!user) {
            navigate('/login')
        }
    }, [isError, user, message])


    // const preset_key = 'xdxoqisy'
    const preset_key = 'qwi4ytn6'
    // const cloud_name = 'dwxhfdats'
    const cloud_name = 'ddmvbrzba'
    const [imageUrl, setImageUrl] = useState()
    const handleFile = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)
        setImageUrl('settingCloudinary')
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then((response) => setImageUrl(response.data.secure_url))
            .catch((error) => console.log(error.response.data))
    }

    const updateImage = () => {
        dispatch(updateProfileImage({ id: user._id, imageUrl })).then(() => {
            setImageUrl(false)
        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        console.log(user)
    })

    return (
        <>
            {isLoading && <Spinner />}
            <div className="user-profile">
                <div className="profile-image">
                    <img className="pimg" style={{width:'250px' , height: '250px'}} src={user.image_url ? user.image_url : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="image of user" /><br />
                    <div>
                        <p>Update image</p>
                        <input type="file" className="uploadimg" name="image" onChange={handleFile} accept="image/*" />
                    </div>
                    <br />
                    <br />
                    {imageUrl == 'settingCloudinary' ? <Spinner /> : null}
                    {imageUrl != 'settingCloudinary' && imageUrl ? <button className="btn" onClick={updateImage}>Update Image</button> : null}
                </div>
                <div className="profile-details">
                    <h1>User Profile</h1>
                    <div>
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                        <button className='update-button' onClick={() => { editProfile(user) }}>Edit Profile</button>
                    </div>
                </div>

            </div>


            {isModalOpen && (
                <UserEdit
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={user}
                    onUpdate={updateThisUser}
                />
            )}
        </>
    )
}

export default Profile