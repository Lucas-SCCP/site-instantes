import React from 'react'
import {
  FaCloudUploadAlt,
  FaImages,
  FaCalendarAlt,
  FaTags,
  FaUsers,
  FaSearch,
  FaFolderOpen,
  FaShieldAlt,
} from 'react-icons/fa'

const floatItems = [
  { id: 'upload', icon: <FaCloudUploadAlt />, label: 'Upload Simples', top: '12%', left: '8%', delay: 'float-delay-1' },
  { id: 'albums', icon: <FaImages />, label: 'Álbuns Inteligentes', top: '18%', right: '10%', delay: 'float-delay-2' },
  { id: 'timeline', icon: <FaCalendarAlt />, label: 'Linha do Tempo', bottom: '20%', left: '12%', delay: 'float-delay-3' },
  { id: 'categories', icon: <FaTags />, label: 'Categorias Automáticas', top: '10%', left: '40%', delay: 'float-delay-4' },
  { id: 'people', icon: <FaUsers />, label: 'Reconhecimento de Pessoas', bottom: '15%', right: '8%', delay: 'float-delay-5' },
  { id: 'search', icon: <FaSearch />, label: 'Busca Inteligente', top: '25%', left: '22%', delay: 'float-delay-6' },
  { id: 'dates', icon: <FaFolderOpen />, label: 'Organização por Datas', bottom: '30%', left: '35%', delay: 'float-delay-7' },
  { id: 'secure', icon: <FaShieldAlt />, label: 'Armazenamento Seguro', top: '15%', right: '28%', delay: 'float-delay-8' },
]

const blobs = [
  { top: '-10%', left: '-10%', size: '500px', color: 'rgba(191, 219, 254, 0.55)' },
  { top: '30%', right: '-15%', size: '450px', color: 'rgba(233, 213, 255, 0.5)' },
  { bottom: '-10%', left: '20%', size: '400px', color: 'rgba(209, 250, 229, 0.5)' },
  { top: '10%', left: '50%', size: '350px', color: 'rgba(252, 231, 243, 0.45)' },
  { bottom: '25%', right: '25%', size: '300px', color: 'rgba(254, 243, 199, 0.45)' },
  { top: '55%', left: '5%', size: '320px', color: 'rgba(221, 214, 254, 0.4)' },
]

function FloatingLayout() {
  return (
    <div className="main-area">
      {/* Blob de fundo com blur */}
      <div className="blob-container">
        {blobs.map((blob, idx) => (
          <div
            key={idx}
            className="blob"
            style={{
              top: blob.top,
              left: blob.left,
              right: blob.right,
              bottom: blob.bottom,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Textos flutuantes */}
      {floatItems.map((item, idx) => (
        <div
          key={idx}
          className={`float-item float-${item.id} ${item.delay}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          <span className="icon">{item.icon}</span>
          {item.label}
        </div>
      ))}

      {/* Centro do layout */}
      <div className="hero-center">
        <h1>instantes</h1>
        <p>
          Organize. Encontre. Reviva.
        </p>
      </div>
    </div>
  )
}

export default FloatingLayout
