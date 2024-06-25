import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Symptoms from '../components/Symptoms'
import DetectPCOS from '../components/DetectPCOS'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
const HomePage = () => {
  return (
    <>
    <Hero/>
    <Symptoms/>
    <DetectPCOS/>
    <ContactForm/>
    </>
  )
}

export default HomePage