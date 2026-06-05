import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Search, User, X } from 'lucide-react'
import type { SessionUser } from '../types'
import { Bx7NavLogo } from './Bx7NavLogo'

type TopNavProps = {
  user: SessionUser
  searchValue: string
  onSearchChange: (value: string) => void
  onLogout: () => void
  sidebarOpen: boolean
  onMenuToggle: () => void
}

export function TopNav({ user, searchValue, onSearchChange, onLogout, sidebarOpen, onMenuToggle }: TopNavProps) {
  const navRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    function syncNavOffset() {
      if (!nav) return
      const { bottom } = nav.getBoundingClientRect()
      document.documentElement.style.setProperty('--mobile-top-nav-height', `${Math.ceil(bottom)}px`)
    }

    syncNavOffset()

    const observer = new ResizeObserver(syncNavOffset)
    observer.observe(nav)
    window.addEventListener('resize', syncNavOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncNavOffset)
      document.documentElement.style.removeProperty('--mobile-top-nav-height')
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!profileOpen) return

    function handlePointerDown(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (profileRef.current?.contains(target)) return
      setProfileOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [profileOpen])

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <nav ref={navRef} className="top-nav" aria-label="Navegación principal">
      <div className="top-nav__start">
        <button
          type="button"
          className="top-nav__menu-toggle"
          onClick={onMenuToggle}
          aria-expanded={sidebarOpen}
          aria-controls="app-sidebar"
          aria-label={sidebarOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
        >
          {sidebarOpen ? <X size={20} strokeWidth={2.25} /> : <Menu size={20} strokeWidth={2.25} />}
        </button>

        <Bx7NavLogo />
        <span className="top-nav__erp-pill">BX7 ERP</span>

        <form className="top-nav__search" role="search" onSubmit={handleSearchSubmit}>
          <Search size={16} className="top-nav__search-icon" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar en todo el sistema..."
            aria-label="Buscar en todo el sistema"
          />
          <kbd className="top-nav__search-kbd" aria-hidden="true">
            Ctrl K
          </kbd>
        </form>
      </div>

      <div className="top-nav__end">
        <button type="button" className="top-nav__notify" aria-label="Notificaciones, 1 sin leer">
          <Bell size={18} />
          <span className="top-nav__notify-badge">1</span>
        </button>

        <div className="top-nav__profile-wrap" ref={profileRef}>
          <button
            type="button"
            className={`top-nav__profile${profileOpen ? ' top-nav__profile--open' : ''}`}
            onClick={() => setProfileOpen((current) => !current)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span className="top-nav__profile-avatar" aria-hidden="true">
              <User size={18} />
            </span>
            <span className="top-nav__profile-copy">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </span>
            <ChevronDown size={16} className="top-nav__profile-chevron" aria-hidden="true" />
          </button>

          {profileOpen ? (
            <div className="top-nav__profile-menu" role="menu" aria-label="Cuenta de usuario">
              <div className="top-nav__profile-menu-head">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <button
                type="button"
                className="top-nav__profile-menu-item"
                role="menuitem"
                onClick={() => {
                  setProfileOpen(false)
                  onLogout()
                }}
              >
                <LogOut size={16} />
                Salir
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
