import { mount, StartClient } from "@solidjs/start/client";
import { upgradeThemedSvgImages } from "@dev-centr/themed-svg/runtime";

mount(() => <StartClient />, document.getElementById("app")!);

const app = document.getElementById("app")!;
const upgradeDiagrams = () => upgradeThemedSvgImages(app);
upgradeDiagrams();
new MutationObserver(upgradeDiagrams).observe(app, {
  childList: true,
  subtree: true,
});
