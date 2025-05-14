export function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-3 md:px-0">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground mx-auto text-sm">
            © {new Date().getFullYear()} WorkoutTracker. Todos os direitos reservados.
          </p>

          {/* <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm">
              Termos de Serviço
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm">
              Cookies
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
