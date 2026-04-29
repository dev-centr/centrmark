import { Title } from "@solidjs/meta";

export default function Terms() {
  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-24 pb-16">
      <Title>Terms of Service - Food Truck Nerdz</Title>
      <h1 class="text-4xl font-heading font-bold mb-8 text-foreground">Terms of Service</h1>
      
      <section class="prose dark:prose-invert max-w-none font-body text-muted-foreground">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using Food Truck Nerdz, you agree to be bound by these Terms of Service.</p>
        
        <h2>2. Data Usage</h2>
        <p>Food Truck Nerdz leverages real-time geolocation. You agree to broadcast accurate location data when opting into business membership features.</p>
        
        <h2>3. Liability</h2>
        <p>We do not guarantee the exact presence of food trucks at mapped locations and are not liable for inaccurate service times reported by independent operators.</p>
      </section>
    </main>
  );
}
