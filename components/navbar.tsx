export const Navbar = () => {
    return (
        <nav className="border border-secondary-foreground/20 rounded-2xl max-w-7xl w-[95%] py-4 px-8 bg-white/10 backdrop-blur-md shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="w-full flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">

                </div>
                <div className="space-x-6">
                    <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
                    <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a>
                    <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Projects</a>
                    <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
                </div>
            </div>
        </nav>
    )
}