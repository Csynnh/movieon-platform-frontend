import React from "react";
import "./style.scss";

const Loading = (props: { children: React.ReactNode; spinning: boolean }) => {
   return props.spinning ? (
      <div className="loading">
         <div className="loading__container">
            <div className="loading__spinner"></div>
         </div>
      </div>
   ) : (
      <>{props.children}</>
   );
};

export default Loading;
