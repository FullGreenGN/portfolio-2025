"use client";
import {useTheme} from "next-themes";
import {FaMoon, FaSun} from "react-icons/fa6";
import {Button} from "@/components/ui/button";

export const ThemeSwitcher = () => {
    const {setTheme, theme} = useTheme();

    return (
        <Button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            variant={"ghost"} size={"icon"}
        >
            {theme === "dark" ? <FaMoon/> : <FaSun/>}
        </Button>
    )
}