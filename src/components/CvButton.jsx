import { site } from '../data'
import { Icon, btnPrimary } from './ui'

// Shows "Download CV" once site.cvUrl is set, otherwise "Request my CV" by email.
export default function CvButton() {
  if (site.cvUrl) {
    return (
      <a href={site.cvUrl} download className={btnPrimary}>
        <Icon name="download" /> Download CV
      </a>
    )
  }
  return (
    <a href={`mailto:${site.email}?subject=CV%20request`} className={btnPrimary}>
      <Icon name="download" /> Request my CV
    </a>
  )
}
