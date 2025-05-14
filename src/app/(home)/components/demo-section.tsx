import { Button } from '@/components/ui/button'

export function DemoSection() {
  return (
    <section id="demo" className="from-primary/5 via-background to-primary/5 bg-gradient-to-br px-3 py-20 md:px-0">
      <div className="container mx-auto">
        <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Veja o Workout Tracker em ação</h2>
          <p className="text-muted-foreground text-lg">
            Uma interface intuitiva e poderosa para transformar sua experiência de treino
          </p>
        </div>

        <div className="animate-fade-up animate-once animate-duration-[800ms] animate-delay-200 relative mx-auto max-w-5xl">
          <div className="from-primary animate-infinite animate-duration-[5000ms] absolute -inset-1 animate-pulse rounded-xl bg-gradient-to-r to-purple-600 opacity-30 blur-xl"></div>
          <div className="bg-background relative overflow-hidden rounded-xl border shadow-2xl">
            <img
              src="/placeholder.svg?height=800&width=1200"
              alt="Demonstração do WorkoutTracker"
              className="h-auto w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-primary/90 hover:bg-primary animate-infinite animate-duration-[2000ms] h-16 w-16 animate-pulse rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
