import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFolderPlus } from 'react-icons/fa'
import AlbumsNavbar from '../components/AlbumsNavbar'

const mockAlbums = [
  { id: 1, name: 'Viagem para o Nordeste', cover: 'https://picsum.photos/seed/ne/400/400' },
  { id: 2, name: 'Aniversário 2024', cover: 'https://picsum.photos/seed/bday/400/400' },
  { id: 3, name: 'Férias de Verão', cover: 'https://picsum.photos/seed/summer/400/400' },
  { id: 4, name: 'Casamento Ana e Pedro', cover: 'https://picsum.photos/seed/wedding/400/400' },
  { id: 5, name: 'Natureza e Paisagens', cover: 'https://picsum.photos/seed/nature/400/400' },
  { id: 6, name: 'Família', cover: 'https://picsum.photos/seed/family/400/400' },
  { id: 7, name: 'Fotos Profissionais', cover: 'https://picsum.photos/seed/pro/400/400' },
  { id: 8, name: 'Pets', cover: 'https://picsum.photos/seed/pets/400/400' },
  { id: 9, name: 'Comidas e Receitas', cover: 'https://picsum.photos/seed/food/400/400' },
  { id: 10, name: 'Esportes e Aventura', cover: 'https://picsum.photos/seed/sport/400/400' },
  { id: 11, name: 'Arquitetura', cover: 'https://picsum.photos/seed/arch/400/400' },
]

function AlbumsPage() {
  const navbarActions = (
    <button
      className="btn-icon"
      onClick={() => alert('Criar novo álbum')}
      title="Criar álbum"
    >
      <FaFolderPlus size={18} />
    </button>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AlbumsNavbar
        breadcrumb={[{ id: 'root', name: 'Meus Álbuns' }]}
        actions={navbarActions}
      />
      <div
        className="albums-page-content"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          backgroundColor: '#f8fafc',
        }}
      >
        <Container fluid>
          <Row className="g-4">
            {mockAlbums.map((album) => (
              <Col xs={6} sm={4} md={3} lg={2} xl={2} key={album.id}>
                <Link to={`/albuns/${album.id}`} className="text-decoration-none">
                  <div className="album-wrapper">
                    <div
                      className="album-card"
                      style={{
                        backgroundImage: `url(${album.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <span className="album-name">{album.name}</span>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Mobile bottom bar */}
      <div className="mobile-bottom-bar d-md-none">
        <div className="bottom-bar-right">
          <button
            className="btn-icon"
            onClick={() => alert('Criar novo álbum')}
            title="Criar álbum"
          >
            <FaFolderPlus size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage
