import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-3 md:px-0">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground mx-auto text-sm">
            © {new Date().getFullYear()} WorkoutTracker. Todos os direitos reservados.
          </p>
          <Button
            className="text-muted-foreground mx-auto flex items-center gap-2 text-sm"
            variant="link"
            effect="hoverUnderline"
          >
            <Icon name="Computer" />
            <a href="https://github.com/YuriLRodrigues" target="_blank" rel="noreferrer">
              Desenvolvido por Yuri L. Rodrigues
            </a>
          </Button>

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
