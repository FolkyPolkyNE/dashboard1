import Sidebar from './Sidebar'

export default function Layout({children, title='Dashboard'}){
  return (
    <div className="app-root">
      <Sidebar />
      <main className="main-content">
        <header className="topbar"><h1>{title}</h1></header>
        <div className="page-body">{children}</div>
      </main>
    </div>
  )
}
