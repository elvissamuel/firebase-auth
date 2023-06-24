import { useEffect, useState } from "react"
import { auth, googleProvider, db } from "../firebase-config"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"

export const Auth = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [movieList, setMovieList] = useState([])

    const [movietitle, setMovieTitle] = useState('')
    const [movieCat, setMovieCat] = useState('')
    const [movieYear, setMovieYear] = useState(0)
    const [noDownload, setNoDownload] = useState(0)
    const [update, setUpdate] = useState('')
    const [updateCat, setUpdateCat] = useState('');

    const docRef = collection(db, "movies");

    const getData = async () =>{
        try {
        const data = await getDocs(docRef);
        const filteredData = data.docs.map((doc) =>({
            ...doc.data(), id: doc.id,
        }))
        setMovieList(filteredData)
        } catch (err){
            console.log(err);
        }
    }


    useEffect(() => {
        
        getData();
    }, [])

    const onSubmitMovie = async () => {
        try{
        await addDoc(docRef, {title: movietitle, category: movieCat, releaseDate: movieYear, downloads: noDownload})
        getData();
        } catch (err) {
            console.log(err)
        }
    }

    const updateMovie = async (id) =>{
        const movieDoc = doc(db, 'movies', id)
        try{
        await updateDoc(movieDoc, {title: update, category: updateCat})
        } catch(err){
            console.log(err)
        }
    }

    const deleteMovie = async (id) =>{
        try{
            const movieDoc = doc(db, 'movies', id)
            await deleteDoc(movieDoc);
            getData();

        } 
        
        catch (err) {
            console.log(err)
        }
    }

    const signIn = async () => {
    try
        {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }

    const withGoogle = async () => {
        try
            {
                await signInWithPopup(auth, googleProvider);
            } catch (err) {
                console.error(err);
            }
        }

    const logout = async () => {
        try
            {
                await signOut(auth);
            } catch (err) {
                console.error(err);
            }
        }

    console.log(auth?.currentUser?.email);
    console.log(movieList);
    return (
        <div>
            <input type="email" onChange={(e)=> setEmail(e.target.value)} name="" id="1" />
            <input type="password" onChange={(e)=> setPassword(e.target.value)} name="" id="2" />
            <button onClick={signIn}>sign in</button>
            <button onClick={withGoogle}>google</button>
            <button onClick={logout}>logout</button>

        <div>
            <input type="text" onChange={(e) => setMovieTitle(e.target.value)} placeholder='enter title' />
            <input type="text" onChange={(e) => setMovieCat(e.target.value)}  placeholder='enter category' />
            <input type="number" onChange={(e) => setMovieYear(e.target.value)}  placeholder='enter year' />
            <input type="number" onChange={(e) => setNoDownload(e.target.value)}  placeholder='enter downloads'/>
            <button onClick={onSubmitMovie}>Submit</button>
        </div>

            <div>
                {movieList.map((movie) => {
                    return (
                        <div>
                            <p>Title: {movie.title}</p>
                            <p>Category: {movie.category}</p>
                            <p>Year: {movie.releaseDate}</p>
                            <p>Downloads: {movie.downloads}</p>
                            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                            <input type="text" placeholder="enter new title" onChange={(e)=>setUpdate(e.target.value)} name="" id="" />
                            <input type="text" placeholder="enter new category" onChange={(e)=>setUpdateCat(e.target.value)}/>
                            <button onClick={()=>updateMovie(movie.id)}>Update</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}