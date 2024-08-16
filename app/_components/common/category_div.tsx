import { AnimatePresence } from "framer-motion";
import CategoryModal from "../modal/category_modal";

export default function CategoryDiv() {
  return (
    <div className="relative flex items-center justify-center shadow-sm rounded-md border border-gray-300 py-4 mt-5 w-[18%] h-8 text-sm font-medium text-gray-500 hover:cursor-pointer">
      <AnimatePresence>
        <div className="absolute w-full h-full rounded-full bg-transparent z-50">
          <CategoryModal />
        </div>
      </AnimatePresence>
    </div>
  );
}
