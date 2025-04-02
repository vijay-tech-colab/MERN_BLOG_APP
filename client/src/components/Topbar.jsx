import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
import reactIcon from '../assets/react.svg'
import SearchBox from './SearchBox';
import { RoutesSignIn } from '@/helpers/routeName';
function Topbar() {
  return (
    <div className='flex justify-between items-center fixed w-full h-16 z-20 bg-white px-5 border-b'>
        <div>
            <img src={reactIcon} alt="" />
        </div>
        <div className='w-[500px]'>
          <SearchBox/>
        </div>
        <div>
            <Button>
                <Link to={RoutesSignIn} >Sign In 
                <CiLogin className='inline' size={30}/>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default Topbar