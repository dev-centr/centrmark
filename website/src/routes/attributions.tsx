import { Title } from "@solidjs/meta";

export default function Attributions() {
  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-24 pb-16">
      <Title>Attributions - Food Truck Nerdz</Title>
      <h1 class="text-4xl font-heading font-bold mb-8 text-foreground">Attributions</h1>
      
      <section class="prose dark:prose-invert max-w-none font-body text-muted-foreground">
        <p>Food Truck Nerdz leverages the incredible work of the open-source community. We proudly attribute the following projects and assets:</p>
        
        <ul class="list-disc pl-6 space-y-2 mt-4">
          <li><strong>SolidStart</strong> & <strong>SolidJS</strong> - For the reactive primitives and server architecture.</li>
          <li><strong>Three.js</strong> - Driving the interactive 3D hero experiences.</li>
          <li><strong>Tailwind CSS</strong> - Powering our bespoke Slate & Copper design system.</li>
          <li><strong>Outfit</strong> & <strong>Hanken Grotesk</strong> (Google Fonts) - Our open-source typography stack.</li>
          <li><strong>Lucide</strong> - Sleek vector iconography.</li>
          <li><strong>Apple & Google Media Badges</strong> - Licensed under fair-use distribution guidelines provided by their respective platforms.</li>
        </ul>
      </section>
    </main>
  );
}
