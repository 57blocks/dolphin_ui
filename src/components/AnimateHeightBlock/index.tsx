'use client'

import { AnimatePresence, motion } from "framer-motion"
import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren { isVisible: boolean, className?: string }

export default function AnimateHeightBlock({ isVisible, children, className = '' }: IProps) {
    return <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={className}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
}