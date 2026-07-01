import React, { useState, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'
import { FaPlus, FaCloudUploadAlt, FaPlusCircle, FaFolderPlus, FaTimes, FaChevronRight } from 'react-icons/fa'
import AlbumsNavbar from '../components/AlbumsNavbar'
import { albumsData } from '../data/albumsMock'

function findNodeById(node, id) {
  if (node.id === id) return node
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id)
      if (found) return found
    }
  }
  return null
}

function findPathToNode(node, targetId, path = []) {
  const currentPath = [...path, node]
  if (node.id === targetId) return currentPath
  if (node.children) {
    for (const child of node.children) {
      const result = findPathToNode(child, targetId, currentPath)
      if (result) return result
    }
  }
  return null
}

function AlbumDetailPage() {
  const { id } = useParams()
  const rootAlbum = albumsData[id]

  const [activeAlbumId, setActiveAlbumId] = useState(rootAlbum?.id || null)

  const [showAlbumModal, setShowAlbumModal] = useState(false)
  const [albumForm, setAlbumForm] = useState({
    name: '',
    description: '',
    notes: '',
    dateType: 'fixed',
    date: '',
    startDate: '',
    endDate: '',
  })

  const [pendingPhotos, setPendingPhotos] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const fileInputRef = useRef(null)

  const activeNode = useMemo(
    () => (rootAlbum ? findNodeById(rootAlbum, activeAlbumId) : null),
    [rootAlbum, activeAlbumId]
  )

  const breadcrumb = useMemo(
    () => (rootAlbum ? findPathToNode(rootAlbum, activeAlbumId) : []),
    [rootAlbum, activeAlbumId]
  )

  if (!rootAlbum) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3>Album nao encontrado</h3>
        <Link to="/albuns">Voltar para albuns</Link>
      </div>
    )
  }

  const handleOpenAlbumModal = () => {
    setAlbumForm({
      name: '',
      description: '',
      notes: '',
      dateType: 'fixed',
      date: '',
      startDate: '',
      endDate: '',
    })
    setShowAlbumModal(true)
  }

  const handleSaveAlbum = () => {
    if (!albumForm.name.trim()) return
    const dateInfo =
      albumForm.dateType === 'fixed'
        ? `Data: ${albumForm.date || 'nao definida'}`
        : `Periodo: ${albumForm.startDate || '?'} ate ${albumForm.endDate || '?'}`
    alert(
      `Album "${albumForm.name.trim()}" criado!\nDescricao: ${albumForm.description || '-'}\nObservacoes: ${albumForm.notes || '-'}\n${dateInfo}`
    )
    setShowAlbumModal(false)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const newPending = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))

    setPendingPhotos((prev) => [...prev, ...newPending])
    e.target.value = ''
  }

  const handleRemovePending = (id) => {
    setPendingPhotos((prev) => {
      const removed = prev.find((p) => p.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((p) => p.id !== id)
    })
  }

  const photos = activeNode?.photos || []
  const subAlbums = activeNode?.children || []

  const navbarActions = (
    <>
      <button
        className="btn-icon"
        onClick={handleOpenAlbumModal}
        title="Novo sub-album"
      >
        <FaFolderPlus size={18} />
      </button>
      <button
        className="btn-icon"
        onClick={() => fileInputRef.current?.click()}
        title="Adicionar foto"
      >
        <FaPlusCircle size={18} />
      </button>
    </>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AlbumsNavbar
        breadcrumb={breadcrumb}
        onBreadcrumbClick={setActiveAlbumId}
        actions={navbarActions}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* Mobile bottom bar */}
      <div className="mobile-bottom-bar d-md-none">
        <button
          className="btn-icon"
          onClick={() => setSidebarOpen(true)}
          title="Ver sub-albuns"
        >
          <FaChevronRight size={22} />
        </button>
        <div className="bottom-bar-right">
          <button
            className="btn-icon"
            onClick={handleOpenAlbumModal}
            title="Novo sub-album"
          >
            <FaFolderPlus size={22} />
          </button>
          <button
            className="btn-icon"
            onClick={() => fileInputRef.current?.click()}
            title="Adicionar foto"
          >
            <FaPlusCircle size={22} />
          </button>
        </div>
      </div>

      {/* Overlay mobile */}
      <div
        className={`sidebar-overlay d-md-none ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <aside className={`album-sidebar slim ${sidebarOpen ? 'open' : ''}`}>
          <button
            className="sidebar-close d-md-none"
            onClick={() => setSidebarOpen(false)}
            title="Fechar"
          >
            <FaTimes size={14} />
          </button>
          <div className="sidebar-current">
            <div
              className="sidebar-current-cover"
              style={{
                backgroundImage: `url(${activeNode?.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <span className="sidebar-current-name">{activeNode?.name}</span>
            <span className="sidebar-current-count">
              {activeNode?.photos?.length || 0} fotos
            </span>
          </div>

          {subAlbums.length > 0 && (
            <div className="sidebar-children">
              {subAlbums.map((sub) => (
                <button
                  key={sub.id}
                  className="sidebar-child-item"
                  onClick={() => {
                    setActiveAlbumId(sub.id)
                    setSidebarOpen(false)
                  }}
                >
                  <div
                    className="sidebar-child-thumb"
                    style={{
                      backgroundImage: `url(${sub.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <span className="sidebar-child-name">{sub.name}</span>
                  <span className="sidebar-child-count">
                    {sub.photos?.length || 0}
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <main className="album-main">
          <div className="main-scroll">
            {(photos.length > 0 || pendingPhotos.length > 0) && (
              <Row className="g-4">
                {photos.map((photo, idx) => (
                  <Col xs={6} sm={4} md={3} lg={2} xl={2} key={`existing-${idx}`}>
                    <div className="photo-card-wrapper">
                      <div
                        className="album-card photo-card"
                        style={{
                          backgroundImage: `url(${photo})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                  </Col>
                ))}

                {pendingPhotos.map((pending) => (
                  <Col xs={6} sm={4} md={3} lg={2} xl={2} key={`pending-${pending.id}`}>
                    <div className="photo-card-wrapper">
                      <div
                        className="album-card photo-card photo-pending"
                        style={{
                          backgroundImage: `url(${pending.preview})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <button
                          className="photo-pending-delete"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemovePending(pending.id)
                          }}
                          title="Remover"
                        >
                          <FaTimes size={12} />
                        </button>
                        <div className="photo-pending-overlay">
                          <FaCloudUploadAlt size={24} />
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}

            {photos.length === 0 && pendingPhotos.length === 0 && (
              <div className="text-center py-5">
                <p className="text-secondary">Este album esta vazio.</p>
                {subAlbums.length > 0 ? (
                  <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                    Este album possui {subAlbums.length} sub-album(s). Selecione um na barra lateral para visualizar.
                  </p>
                ) : (
                  <button
                    className="btn-create-subalbum"
                    onClick={handleOpenAlbumModal}
                  >
                    <FaPlus size={12} />
                    <span>Criar Sub-album</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal show={showAlbumModal} onHide={() => setShowAlbumModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Novo Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome do album</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Viagem para o Nordeste"
                value={albumForm.name}
                onChange={(e) =>
                  setAlbumForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descricao</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descreva o conteudo deste album"
                value={albumForm.description}
                onChange={(e) =>
                  setAlbumForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Observacoes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Notas adicionais sobre o album"
                value={albumForm.notes}
                onChange={(e) =>
                  setAlbumForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <div className="d-flex gap-3 mb-2">
                <Form.Check
                  type="radio"
                  label="Data fixa"
                  name="dateType"
                  checked={albumForm.dateType === 'fixed'}
                  onChange={() =>
                    setAlbumForm((f) => ({ ...f, dateType: 'fixed' }))
                  }
                />
                <Form.Check
                  type="radio"
                  label="Periodo"
                  name="dateType"
                  checked={albumForm.dateType === 'range'}
                  onChange={() =>
                    setAlbumForm((f) => ({ ...f, dateType: 'range' }))
                  }
                />
              </div>

              {albumForm.dateType === 'fixed' ? (
                <Form.Control
                  type="date"
                  value={albumForm.date}
                  onChange={(e) =>
                    setAlbumForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              ) : (
                <div className="d-flex gap-2">
                  <Form.Control
                    type="date"
                    placeholder="Inicio"
                    value={albumForm.startDate}
                    onChange={(e) =>
                      setAlbumForm((f) => ({ ...f, startDate: e.target.value }))
                    }
                  />
                  <Form.Control
                    type="date"
                    placeholder="Fim"
                    value={albumForm.endDate}
                    onChange={(e) =>
                      setAlbumForm((f) => ({ ...f, endDate: e.target.value }))
                    }
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowAlbumModal(false)}>
            Cancelar
          </Button>
          <Button
            className="btn-primary-custom"
            onClick={handleSaveAlbum}
            disabled={!albumForm.name.trim()}
          >
            Criar Album
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AlbumDetailPage
