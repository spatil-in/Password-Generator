import React, { useCallback, useEffect, useRef, useState } from "react";

export default function PassGen(){

    const [length , setLength] = useState(8)
    const [numAllow ,setNumAllow] = useState(false)
    const [charAllow ,setCharAllow] = useState(false)
    const [password ,setPassword] = useState(6)

const passGenrator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllow) str += "0123456789"
    if(charAllow) str += "~!@#$%^&*()_+{}<>?/"

    for(let i = 0 ; i < length ; i++ ){
        let randomChar = Math.floor(Math.random() * str.length)
        pass += str.charAt(randomChar)
    }
    setPassword(pass)
},[length,numAllow,charAllow,setPassword])

useEffect(() => {
    passGenrator()
} , [length,numAllow,charAllow,passGenrator])

const passRef = useRef()

const copyPass = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
},[password])


    return(
        <>
        <div className="bg-gray-500 w-xl rounded-xl p-4 mx-auto mt-10">
            <div className="flex items-center">
                <input
                ref={passRef}
                className="outline-none rounded-l-2xl px-4 py-2 bg-white text-black w-full" 
                type="text"
                value={password}
                placeholder="Password"
                readOnly
                />
                <button
                onClick={copyPass}
                className="bg-sky-400 rounded-r-2xl px-4 py-2 outline-none"
                >Copy</button>
            </div>
            <div className="mt-5 flex items-center gap-10 text-white">
                <div className="flex items-center gap-5 w-1/2">
                <input
                min={6}
                max={20}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))} 
                type="range" 
                />
                <label htmlFor="">length : {length}</label>
                </div>
                <div className="flex items-center gap-3">
                    <input 
                    checked={numAllow}
                    onChange={() => setNumAllow(prev => !prev)}
                    type="checkbox" 
                    />
                    <label htmlFor="">Number</label>
                    <input 
                    checked={charAllow}
                    onChange={() => setCharAllow(prev => !prev)}
                    type="checkbox" 
                    />
                    <label htmlFor="">Character</label>
                </div>
            </div>
            <textarea 
            className="w-full rounded-lg bg-white px-5 py-2 mt-10 outline-none"
            type="text" 
            placeholder="Paste here"
            />
        </div>
        </>
    )
}