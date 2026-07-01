import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { Image } from 'react-bootstrap'

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOE00IDE3djJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg=='

function AlbumsNavbar({ breadcrumb = [], onBreadcrumbClick, actions }) {
  const renderBreadcrumb = () => (
    <>
      <Link to="/albuns" className="breadcrumb-item">
        Meus Álbuns
      </Link>
      {breadcrumb.map((node, idx) => (
        <React.Fragment key={node.id}>
          <FaChevronRight size={10} className="breadcrumb-sep" />
          {idx === breadcrumb.length - 1 ? (
            <span className="breadcrumb-item active">{node.name}</span>
          ) : (
            <button
              className="breadcrumb-item link"
              onClick={() => onBreadcrumbClick?.(node.id)}
            >
              {node.name}
            </button>
          )}
        </React.Fragment>
      ))}
    </>
  )

  return (
    <>
      <nav className="navbar-unified">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <span className="text-instantes">instantes</span>
          </Link>
          <span className="navbar-divider d-none d-md-block" />
          <div className="navbar-breadcrumb d-none d-md-flex">
            {renderBreadcrumb()}
          </div>
        </div>

        <div className="navbar-right">
          {actions && <div className="navbar-actions d-none d-md-flex">{actions}</div>}
          <span className="navbar-username d-none d-md-block">Lucas da Silva</span>
          <div className="navbar-avatar">
            <img
              src={defaultAvatar}
              alt="Lucas da Silva"
              onError={(e) => { e.target.src = defaultAvatar }}
            />
          </div>
        </div>
      </nav>

      {/* Breadcrumb mobile — linha separada abaixo da navbar */}
      {breadcrumb.length > 0 && (
        <div className="mobile-breadcrumb d-md-none">
          {renderBreadcrumb()}
        </div>
      )}
    </>
  )
}

export default AlbumsNavbar
