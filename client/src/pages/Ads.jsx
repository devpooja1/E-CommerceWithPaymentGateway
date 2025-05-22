// import UserRegistration from "../auth/UserRegistration";
// import { useState,useEffect } from "react";
// const AdWithForm = () => {
//   // State to control whether the ad and form are shown
//   const [showAd, setShowAd] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   // UseEffect hook to show the ad and form after 5 seconds
//   useEffect(() => {
//     // Set timeout for 5 seconds
//     const timer = setTimeout(() => {
//       setShowAd(true);
//       setShowForm(true);
//     }, 5000); // 5000ms = 5 seconds

//     // Cleanup function to clear the timer if the component is unmounted
//     return () => clearTimeout(timer);
//   }, []);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     alert("Form submitted!");
//   };

//   return (
//     <>
//     <UserRegistration/>
//     </>
//   );
// };

// export default AdWithForm;
