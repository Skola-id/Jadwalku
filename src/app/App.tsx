import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "sonner";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </DndProvider>
  );
}