import Link from 'next/link'
import { useRouter } from 'next/router'

const items = [
  {href:'/', label:'Dashboard'},
  {href:'/accounts', label:'Accounts'},
  {href:'/situations', label:'Situation Monitoring'},
  {href:'/research', label:'Research & Analysis'},
  {href:'/ops', label:'Current Ops'},
  {href:'/content', label:'Content'},
]

export default function Sidebar(){
  const router = useRouter()
  return (
    <aside className="sidebar">
      <div className="brand">DarkAdmin</div>
      <nav>
        {items.map(i=> (
          <Link key={i.href} href={i.href} className={router.pathname===i.href? 'nav-link active' : 'nav-link'}>
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
