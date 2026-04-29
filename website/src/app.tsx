import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import CentrMarkHeader from "./components/CentrMarkHeader";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>Food Truck Nerdz</Title>
          <Title>CentrMark</Title>
          <CentrMarkHeader />
          <Suspense fallback={<div>Loading...</div>}>
            {props.children}
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
