'use client'

import { useRouter } from 'next/navigation'
const About = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div>
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4"
      onClick={handleClick}>戻る</button>
    </div>
  );
};

export default About;
