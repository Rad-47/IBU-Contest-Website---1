import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhatIsFanLinc from '@/components/WhatIsFanLinc'
import AppPreview from '@/components/AppPreview'
import WhatIsCompetition from '@/components/WhatIsCompetition'
import OpenFieldPrinciple from '@/components/OpenFieldPrinciple'
import StudentJourney from '@/components/StudentJourney'
import IdeaCategories from '@/components/IdeaCategories'
import WhoIsItFor from '@/components/WhoIsItFor'
import StudentBenefits from '@/components/StudentBenefits'
import PrizeSection from '@/components/PrizeSection'
import SelectionCriteria from '@/components/SelectionCriteria'
import CompetitionRules from '@/components/CompetitionRules'
import HowToSubmit from '@/components/HowToSubmit'
import FAQ from '@/components/FAQ'
import FooterCTA from '@/components/FooterCTA'
import FooterMarquee from '@/components/FooterMarquee'
import Footer from '@/components/Footer'

function GlowDivider() {
  return <div className="glow-divider mx-auto max-w-4xl my-6" aria-hidden="true" />
}

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <GlowDivider />
        <WhatIsFanLinc />
        <AppPreview />
        <GlowDivider />
        <WhatIsCompetition />
        <OpenFieldPrinciple />
        <GlowDivider />
        <StudentJourney />
        <IdeaCategories />
        <GlowDivider />
        <WhoIsItFor />
        <StudentBenefits />
        <GlowDivider />
        <PrizeSection />
        <SelectionCriteria />
        <CompetitionRules />
        <GlowDivider />
        <HowToSubmit />
        <FAQ />
        <FooterCTA />
      </main>
      <FooterMarquee />
      <Footer />
    </SmoothScroll>
  )
}
