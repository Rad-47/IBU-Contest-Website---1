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
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <WhatIsFanLinc />
        <AppPreview />
        <WhatIsCompetition />
        <OpenFieldPrinciple />
        <StudentJourney />
        <IdeaCategories />
        <WhoIsItFor />
        <StudentBenefits />
        <PrizeSection />
        <SelectionCriteria />
        <CompetitionRules />
        <HowToSubmit />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
