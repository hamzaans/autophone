'use client';
import React, { useState } from "react";

interface Appointment {
  date: string;
  time: string;
  name: string;
  phone1: string;
  phone2: string;
}

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset submission state when new file is uploaded
    setHasSubmitted(false);
    setIsSubmitting(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      console.log('Raw text:', text);
      const parsedAppointments = parseAppointments(text);
      console.log('Parsed appointments:', parsedAppointments);
      setAppointments(parsedAppointments);
    };
    reader.readAsText(file);
  };

  const parseAppointments = (text: string): Appointment[] => {
    return text
      .split('\n')
      .filter(line => line.trim())
      .filter(line => line.includes('|'))
      .map(line => {
        const parts = line.split('|').map(part => part.trim()).filter(Boolean);
        return {
          date: parts[0] || '',
          time: parts[1] || '',
          name: parts[2] || '',
          phone1: parts[3] || '',
          phone2: parts[4] || ''
        };
      });
  };

  const handleSubmit = () => {
    if (appointments.length > 0 && !hasSubmitted) {
      setIsSubmitting(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
        alert('File submitted successfully!');
        setIsSubmitting(false);
        setHasSubmitted(true);
      }, 1000);
    } else if (hasSubmitted) {
      alert('File has already been submitted');
    } else {
      alert('Please upload a file first');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">Appointment Viewer</h1>
        
        <input
          type="file"
          onChange={handleFileUpload}
          className="mb-8 block w-full text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-600 file:text-white
            hover:file:bg-violet-700
            cursor-pointer"
        />

        {appointments.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border-collapse bg-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone 1</th>
                    <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone 2</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {appointments.map((apt, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700">{apt.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700">{apt.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700">{apt.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700">{apt.phone1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700">{apt.phone2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || hasSubmitted}
                className={`px-6 py-2 rounded-lg font-semibold text-sm
                  ${isSubmitting 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : hasSubmitted 
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 transition-colors duration-200'
                  }
                  text-white`}
              >
                {isSubmitting 
                  ? 'Submitting...' 
                  : hasSubmitted 
                    ? 'Submitted' 
                    : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
