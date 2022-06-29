import {useContext, useEffect, useState} from "react";
import axios from "axios";

import {SectionTitle} from "../../components/UI";
import {Container} from "../../components/Container";
import {Avatar} from "../../components/Avatar/Avatar";
import {AppContext} from "../../context/AppContext";
import {InformationContainer, Wrap} from "./Style";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import {Button} from "../../components/Button";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const navigate = useNavigate();
    const {token, userInformation, setUserInformation, isAdmin} = useContext(AppContext);
    const [newUserName, setNewUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const saveUserInformation = () => {
        console.log('click')
    }
    const editUser = async () => {
        if (!userInformation) return
        try {
            let res = await axios.post('/auth/editUser', {name: newUserName, email: newEmail},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (res.data.edit === true) {
                setUserInformation({...userInformation, name: newUserName, email: newEmail})
            }

            console.log('result get users', res);
        } catch (err) {

            console.log(err);
        }
    }

    useEffect(()=> {
        if (!userInformation) {
            navigate('/')
            return
        }

        setNewUserName(userInformation.name)
        setNewEmail(userInformation.email)
    },[userInformation])


    // if (!token || !userInformation) {
    //     return 'error'
    // }

    return (
        <Wrap>

            {userInformation && <Container>
                <Avatar srcImg={''} name={userInformation.name}/>
                <SectionTitle>
                    Information
                </SectionTitle>
                <InformationContainer>
                    <InputDecor label={'Name'} placeHolder={'userName'} type={'text'} value={newUserName}
                                changeValue={(e)=> setNewUserName(e.target.value)} error={''}/>
                    <InputDecor
                        label={'Email'}
                        placeHolder={'userName'}
                        type={'text'}
                        value={newEmail}
                        changeValue={(e) => setNewEmail(e.target.value)} error={''}/>
                    <Button type="button" onClick={editUser}> Save </Button>
                    {/*<button type="button" onClick={getUsers}> get users</button>*/}
                </InformationContainer>
            </Container>}
        </Wrap>
    )
}