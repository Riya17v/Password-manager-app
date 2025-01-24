import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [Form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPassword = async ()=>{
        const req = await fetch("http://127.0.0.1:8000/")
        const passwords = await req.json()        
        setpasswordArray(passwords)
        console.log(passwords);

    }

    useEffect(() => {
        getPassword()

    }, [])

    const showPassword = () => {
          
        if (ref.current.src.includes("/hiddeneyeicon.png")) {
            ref.current.src = "/eyeicon.png"
            passwordref.current.type = "password"
        }
        else {
            passwordref.current.type = "text"
            ref.current.src = "/hiddeneyeicon.png"
        }
    }

    const savePassword = async () => {
        if (Form.site.length > 3 && Form.username.length > 3 && Form.password.length > 3) {

           // if any such id exists in the db , delete it 
            await fetch("http://localhost:8000/",{method:"DELETE" , headers:{"Content-Type":"application/json"}, body: JSON.stringify({...Form, id: Form.id })})
            
            setpasswordArray([...passwordArray, { ...Form, id: uuidv4() }])
             await fetch("http://localhost:8000/",{method:"POST" , headers:{"Content-Type":"application/json"}, body: JSON.stringify({ ...Form, id: uuidv4() }) })
                   

            // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...Form, id: uuidv4() }]))
            // console.log([...passwordArray, Form]);
            
            setForm({ site: "", username: "", password: "" })
           
    
           
           
        }
        else{
            toast('Error-password not saved! Length should be greater than 3');
        }
        
        
    }
    const deletePassword = async (id) => {

        console.log("deleting password with id", id);
        let con = confirm("Are you sure you want to delete?")
        if (con) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))
           let res = await fetch("http://localhost:8000/",{method:"DELETE" , headers:{"content-Type":"application/json"}, body: JSON.stringify({ id })})
                   

            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }


    }
    const editPassword = (id) => {

        console.log("editing password with id", id);
        setForm({...passwordArray.filter(i => i.id === id)[0] , id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))

        // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        // console.log([...passwordArray, Form]);
    }


    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    return (
    <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full "><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className=" mycontainer p-2 pt-3  min-h-[87.7vh]  ">
                <h1 className=" text-2xl  text-center font-bold">

                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>

                <p className=' text-center text-green-700'>Your own password manager</p>

                <div className='text-black flex flex-col p-4 gap-8 items-center ' >
                    <input value={Form.site} onChange={handleChange} placeholder='Enter website URL' className=' rounded-full w-full border border-green-900 p-4 py-1' type="text" name="site" id="" />

                    <div className="flex gap-4 flex-col md:flex-row w-full justify-between">
                        <input value={Form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full border border-green-900 p-4 py-1' type="text" name='username' />

                        <div className="relative">

                            <input ref={passwordref} value={Form.password} onChange={handleChange} placeholder='Enter Password' className=' rounded-full w-full border border-green-900 p-4 py-1' type="password" name='password' />
                            <span className='absolute right-[3px] top-[7px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className=' p-1' width={26} src="/eyeicon.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <div className=' py-5'>

                        <button onClick={savePassword} className=' flex items-center justify-center gap-2 px-3 py-1 border border-green-800 w-fit rounded-full hover:bg-green-500 bg-green-400 '>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            Add password</button>
                    </div>

                </div>
                <div className="container w-full ">
                    <h2 className=' font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords</div>}
                    {passwordArray.length !== 0 && <div className="w-full overflow-x-auto rounded-lg  pb-3">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className=' bg-green-800 text-white'>
                                <tr  >
                                    <th className=' p-2  '>Site</th>
                                    <th className=' p-2  '>Username</th>
                                    <th className=' p-2 '>Password</th>
                                    <th className=' p-2 '>Action</th>
                                </tr>
                            </thead>
                            <tbody className=' bg-green-100  '>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' text-center  py-2 border border-white' >
                                            <div className='sm:flex items-center justify-center'>
                                                <a href="{item.site}" target='_blank'>{item.site}</a>
                                                <div className=' flex items-center justify-center mx-6 cursor-pointer mix-blend-darken'>

                                                    <img src="/copy.png" alt="copy" width={"20"} onClick={() => { copytext(item.site) }} />
                                                </div>
                                            </div>

                                        </td>

                                        <td className=' text-center  py-2 border border-white'>
                                            <div className='sm:flex  items-center justify-center '>
                                                <span>{item.username} </span>

                                                <div className=' flex items-center justify-center mx-6 cursor-pointer mix-blend-darken'>

                                                    <img src="/copy.png" alt="copy" width={"20"} onClick={() => { copytext(item.username) }} />
                                                </div>
                                            </div>

                                        </td>


                                        <td className='text-center  py-2 border border-white'>

                                            <div className='sm:flex  items-center justify-center'>
                                                <span className='font-bold'>{"*".repeat(item.password.length)}</span>
                                                <div className=' flex items-center justify-center mx-6 cursor-pointer mix-blend-darken'>

                                                    <img src="/copy.png" alt="copy" width={"20"} onClick={() => { copytext(item.password) }} />
                                                </div>
                                            </div>

                                        </td>
                                        <td className='text-center  py-2 border border-white'>

                                            <div className='sm:flex items-center justify-center cursor-pointer px-6 gap-2 '>
                                                <span onClick={() => { editPassword(item.id) }}>
                                                    <img src="/edit.png" alt="edit" width={"25"} height={"25"} />
                                                </span>
                                                {/* <span onClick={() => { deletePassword(item.id) }}><lord-icon
                                                    src="/delete.png"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span> */}
                                                 <span onClick={() => { deletePassword(item.id) }}>
                                                    <img src="/delete.png" alt="delete" width={"25"} height={"25"} />
                                                </span>


                                            </div>

                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                        </div>
                }

                    </div>

        </div >

            </>

            )
}

            export default Manager
