'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:",.<>?';

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error("Please select at least one character type for the password.");
      return;
    }

    let validChars = '';
    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Password Generator</h1>
      <div className="my-4">
        <label className="block">
          Password length:
          <input
            type="number"
            className="ml-2 border rounded p-1"
            min="8"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label className="block">
          Include uppercase letters
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
        </label>
        <label className="block">
          Include lowercase letters
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
        </label>
        <label className="block">
          Include numbers
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </label>
        <label className="block">
          Include symbols
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
        </label>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
      {password && (
        <p className="mt-4">Generated Password: <strong>{password}</strong></p>
      )}
    </div>
  );
};

export default Home;
