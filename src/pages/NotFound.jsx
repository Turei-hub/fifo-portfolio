import { Link } from 'react-router-dom'
import { Page, PageHeader, btnPrimary } from '../components/ui'

export default function NotFound() {
  return (
    <Page title="Page not found">
      <PageHeader eyebrow="404" title="Wrong track">That page doesn't exist.</PageHeader>
      <Link to="/" className={`${btnPrimary} self-start`}>Back to home</Link>
    </Page>
  )
}
