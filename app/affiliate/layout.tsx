import React from "react";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Affiliates"
}


const layout = ({children}: {children: React.ReactNode})=>{
    return (
        <>
            {children}
        </>
    )
}

export default layout ;