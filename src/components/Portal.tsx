// "use client";

// import { createPortal } from "react-dom";

// export default function Modal({ children }: React.PropsWithChildren) {
//   const [mounted, setMounted] = React.useState(false);
//   React.useEffect(() => setMounted(true), []);

//   return mounted ? createPortal(<div className="absolute top-0 z-40">{children}</div>, document.body) : null;
// }
