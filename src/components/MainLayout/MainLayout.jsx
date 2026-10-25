import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Cursor from "../ui/Cursor";
import Preloader from "../ui/Preloader";
import SmoothScroll, { useScrollLock, useScrollTo } from "../ui/SmoothScroll";
import { ScrollProgress } from "../ui/Bits";
import { LoadedContext } from "../../lib/motion";

function Shell() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);
  const { pathname, hash } = useLocation();
  const scrollTo = useScrollTo();

  useScrollLock(loading);

  // On route change: jump to the requested section, or to the top
  useEffect(() => {
    if (loading) return;
    if (hash) {
      const t = setTimeout(() => scrollTo(hash, { offset: 0 }), 100);
      return () => clearTimeout(t);
    }
    scrollTo(0, { immediate: true });
  }, [pathname, hash, loading, scrollTo]);

  return (
    <LoadedContext.Provider value={!loading}>
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0f2416",
            color: "#ffffff",
            borderRadius: "999px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#8be78b", secondary: "#0f2416" } },
        }}
      />
    </LoadedContext.Provider>
  );
}

export default function MainLayout() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Shell />
      </SmoothScroll>
    </MotionConfig>
  );
}
