import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print'; // Import the hook

function Certificate(props) {
  // props: name, course, date

  const componentRef = useRef();

  // Hook for handling the print functionality
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Specify the component to print
  });

  return (
    <>
    <div className="certificate" ref={componentRef}>
      <div className="border">
        <h1>Certificate of Completion</h1>
        <p>This certifies that</p>
        <p className="name">{props.name}</p>
        <p>Has successfully met the requirements for</p>
        <p className="course">{props.course}</p>
        <p>In Witness Whereof, we have caused this certificate to be signed this</p>
        <p className="date">{props.date}</p>
      </div>
     
    </div>
     {/* Render the button */}
     <center><button onClick={handlePrint} className="text-center items-center bg-blue-600 px-4 py-2 rounded-md text-white">
        Download Certificate
      </button></center>
    </>
  );
}

export default Certificate;
