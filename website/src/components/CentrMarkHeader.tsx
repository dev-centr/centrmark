import { A } from "@solidjs/router";

export default function CentrMarkHeader() {
  return (
    <header class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md px-6 shadow-sm">
      <div class="flex h-16 items-center justify-between max-w-5xl mx-auto">
        <div class="flex items-center gap-3">
          <A href="/" class="flex items-center gap-2">
            <div class="h-10 w-10 rounded-full bg-primary/10 border border-border flex items-center justify-center text-primary font-bold">
              CMK
            </div>
            <span class="font-heading text-xl font-bold tracking-tight text-foreground">
              CentrMark
            </span>
          </A>
        </div>

        <nav class="hidden md:flex items-center gap-6">
          <A href="/" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </A>
          <A href="/examples" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Examples
          </A>
          <A href="/docs" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Docs
          </A>
        </nav>
      </div>
    </header>
  );
}

