import React from "react";

const CircularProgress = ({className}) => <div className={`loader ${className}`}>
  <img src="/assets/images/elogs-loading.gif" alt="loader"/>
</div>;
export default CircularProgress;
