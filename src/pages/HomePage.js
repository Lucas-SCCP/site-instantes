import React, { useState } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import FloatingLayout from '../components/FloatingLayout'
import LoginModal from '../components/LoginModal'

function HomePage() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <NavbarComponent onLoginClick={() => setShowLogin(true)} />
      <FloatingLayout />
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  )
}

export default HomePage
