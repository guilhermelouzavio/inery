import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import logoImg from '../assets/logo.svg'
import medicineImg from '../assets/medicine.svg'
import '../styles/pages/landing.css'

export default function LandingPage() {
  return (
    <div id="landing-container">
      <div className="content-wrapper">
        <img src={logoImg} alt="iNery" />

        <main>
          <h1>Não esqueça de tomar seus remédios!</h1>
          <p>Tenha os horários na palma as suas mãos.</p>
        </main>
        <Link to='/pacient/create' className="enter-app">
          <FiArrowRight size={30} color='#fff' />
        </Link>

        <img src={medicineImg} alt="Remédios" className="medicine-img"/>

      </div>
    </div>
  )
}