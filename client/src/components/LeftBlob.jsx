import React from 'react'
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LeftBlob = ({ setOpen, open, blobButtonVariants, sidebarVariants, backdropVariants, title = "My Blog"}) => {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((s) => !s)}
        className="relative flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white bg-white/10 backdrop-blur"
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={blobButtonVariants}
      >
        {/* Blob visual */}
        <motion.span
          className="absolute inset-0 rounded-full"
          layout
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 20%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.03), transparent 30%)',
          }}
        />
        <motion.span className="relative text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </motion.span>
      </motion.button>
      <Link to="/">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold leading-tight truncate">{title}</h1>
          <p className="text-xs text-white/70">Insightful stories & code</p>
        </div>
      </Link>
    </div>
  )
}

export default LeftBlob