import { Avatar } from "@hilla/react-components/Avatar";
import { MenuBar } from "@hilla/react-components/MenuBar";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./Tenant.scss";
const Tenant: React.FC<any> = ({ tenantData }) => {
   const [avatarComponent, setAvatarComponent] = useState<HTMLDivElement>();

   useEffect(() => {
      const container = document.createElement("div");
      createRoot(container).render(
         <Avatar name={`${tenantData?.username.toUpperCase()}`} />
      );
      setAvatarComponent(container);
   }, [tenantData]);

   const handleSelectItem = (event: any) => {
      const eventValue = event.detail.value.text;
      if (eventValue === "Sign out") {
         handleSignOut();
      }
   };
   const handleSignOut = () => {
      localStorage.removeItem("tenant");
      window.location.reload();
   };
   const menuBarItems = [
      {
         component: avatarComponent,
         children: [
            {
               text: "Profile",
            },
            {
               text: "Settings",
            },
            {
               text: "Sign out",
            },
         ],
      },
   ];

   return (
      <>
         {tenantData && (
            <div className={"search-auth flex items-center"}>
               <MenuBar
                  items={menuBarItems}
                  theme="tertiary-inline"
                  onItemSelected={handleSelectItem}
               />
            </div>
         )}
      </>
   );
};

export default Tenant;
