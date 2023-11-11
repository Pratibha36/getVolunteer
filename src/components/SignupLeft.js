import React from 'react'
import "./SignupLeft.css";
import {
	Box,
	Image,
	Heading,
	List,
	ListIcon,
	ListItem,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const SignUpLeft = () => {
  return (
    <div>
    <div className='leftRegister'>
      <Box className='leftRegisterBox'>
        <Image
          src="https://static.naukimg.com/s/7/104/assets/images/green-boy.c8b59289.svg"
          alt="rImage"
          className='leftRegisterBoxImage'
        />

        <Box className='leftRegisterSubBox'>
          <Heading size="md" className='leftRegisterBoxHeading'>
            On registering, you can
          </Heading>

          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green" />
              Build your profile and let recruiters find you
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green" />
              Get volunteering postings delivered right to your email
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green" />
              Find volunteers
            </ListItem>
          </List>
        </Box>
      </Box>
    </div>
</div>
  )
}

export default SignUpLeft