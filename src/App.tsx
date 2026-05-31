/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedApp } from "./components/FeaturedApp";
import { AndroidApps } from "./components/AndroidApps";
import { AppGrid } from "./components/AppGrid";
import { Feedback } from "./components/Feedback";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-indigo-500/30 bg-[#0a0a0a] text-[#e5e5e5] scroll-smooth">
      <Navbar />
      <Hero />
      <FeaturedApp />
      <AndroidApps />
      <AppGrid />
      <Feedback />
      <Footer />
    </div>
  );
}
