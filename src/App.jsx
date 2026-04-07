import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LenisProvider } from './context/LenisContext'
import { Navbar } from './components/sections/Navbar'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Cursor } from './components/ui/Cursor'
import { Loader } from './components/ui/Loader'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { BackToTop } from './components/ui/BackToTop'

const Hero = lazy(() =>
  import('./components/sections/Hero').then((m) => ({ default: m.Hero }))
)
const About = lazy(() =>
  import('./components/sections/About').then((m) => ({ default: m.About }))
)
const Skills = lazy(() =>
  import('./components/sections/Skills').then((m) => ({ default: m.Skills }))
)
const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({
    default: m.Projects,
  }))
)
const Experience = lazy(() =>
  import('./components/sections/Experience').then((m) => ({
    default: m.Experience,
  }))
)
const GitHub = lazy(() =>
  import('./components/sections/GitHub').then((m) => ({ default: m.GitHub }))
)
// const LinkedInPosts = lazy(() =>
//   import('./components/sections/LinkedInPosts').then((m) => ({
//     default: m.LinkedInPosts,
//   }))
// )
const Testimonials = lazy(() =>
  import('./components/sections/Testimonials').then((m) => ({
    default: m.Testimonials,
  }))
)
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact }))
)
const Footer = lazy(() =>
  import('./components/sections/Footer').then((m) => ({ default: m.Footer }))
)

const sectionFallback = (
  <div className="flex min-h-[30vh] items-center justify-center bg-dark">
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-pink border-t-transparent"
      aria-hidden
    />
  </div>
)

function SectionSuspense({ children }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={sectionFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="bg-dark"
    >
      <Navbar />
      <SectionSuspense>
        <Hero />
      </SectionSuspense>
      <SectionSuspense>
        <About />
      </SectionSuspense>
      <SectionSuspense>
        <Skills />
      </SectionSuspense>
      <SectionSuspense>
        <Projects />
      </SectionSuspense>
      <SectionSuspense>
        <Experience />
      </SectionSuspense>
      <SectionSuspense>
        <GitHub />
      </SectionSuspense>
      {/* <SectionSuspense>
        <LinkedInPosts />
      </SectionSuspense> */}
      <SectionSuspense>
        <Testimonials />
      </SectionSuspense>
      <SectionSuspense>
        <Contact />
      </SectionSuspense>
      <SectionSuspense>
        <Footer />
      </SectionSuspense>
    </motion.div>
  )
}

export default function App() {
  return (
    <LenisProvider>
      <Cursor />
      <ScrollProgress />
      <Loader />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <BackToTop />
    </LenisProvider>
  )
}
